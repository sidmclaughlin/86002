import { Button, Divider, Grid, LoadingOverlay, Modal, Space, Title } from '@mantine/core';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Role } from '../../../authentication/dtos/user.dto';
import { useAppSelector } from '../../../store/hooks';
import { useGetPaintsQuery, useGetSettingsQuery } from '../../../store/services/api.service';
import { BulkEditForm } from './components/BulkEditForm';
import { Swimlane } from './components/Swimlane';

const PaintBoardPage = () => {
  const [bulkModalVisible, setBulkModalVisible] = useState<boolean>(false);

  const { data: paintData, error, isLoading } = useGetPaintsQuery();
  const { data: settingsData } = useGetSettingsQuery();

  const { role } = useAppSelector(state => state.authentication.user!);

  const paints = () =>
    paintData
      ? {
          avail: paintData
            ?.filter(p => p.count > (settingsData?.threshold_stock_low ?? 5))
            .sort((a, b) => {
              if (a.count < b.count) return 1;
              if (a.count > b.count) return -1;

              return 0;
            }),
          low: paintData
            ?.filter(p => p.count <= (settingsData?.threshold_stock_low ?? 5) && p.count > 0)
            .sort((a, b) => {
              if (a.count < b.count) return 1;
              if (a.count > b.count) return -1;

              return 0;
            }),
          out: paintData
            ?.filter(p => p.count === 0)
            .sort((a, b) => {
              if (a.count < b.count) return 1;
              if (a.count > b.count) return -1;

              return 0;
            }),
        }
      : undefined;

  return (
    <>
      <Helmet title="Paints" />
      <LoadingOverlay visible={isLoading} />
      <Space mt={20} />
      <Modal opened={bulkModalVisible} onClose={() => setBulkModalVisible(false)} title="Update Quantity">
        <BulkEditForm setModalVisible={setBulkModalVisible} paints={paintData} />
      </Modal>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title order={1}>Paint Stock</Title>
        {role === Role.ADMIN && (
          <Button onClick={() => setBulkModalVisible(true)} size="xs">
            Edit
          </Button>
        )}
      </div>
      <Divider mb={20} />

      <Grid>
        <Grid.Col span={4}>
          <Swimlane paints={paints()?.avail} title="Available" />
        </Grid.Col>
        <Grid.Col span={4}>
          <Swimlane
            paints={paints()?.low}
            title="Running Low"
            subtitle={`${settingsData?.threshold_stock_low ?? 5} or less`}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Swimlane paints={paints()?.out} title="Out of Stock" />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default PaintBoardPage;
