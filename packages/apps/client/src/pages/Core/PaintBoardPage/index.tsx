import { Button, Divider, Grid, Header, LoadingOverlay, Space, Stack, Title } from '@mantine/core';
import { Helmet } from 'react-helmet-async';
import { Role } from '../../../authentication/dtos/user.dto';
import { useAppSelector } from '../../../store/hooks';
import { useGetPaintsQuery, useGetSettingsQuery } from '../../../store/services/api.service';
import { PaintChip } from './components/PaintChip';

const PaintBoardPage = () => {
  const { data: paintData, error, isLoading } = useGetPaintsQuery();
  const { data: settingsData } = useGetSettingsQuery();

  const { role } = useAppSelector(state => state.authentication.user!);

  const paints = paintData
    ? {
        avail: paintData?.filter(p => p.count > (settingsData?.threshold_stock_low ?? 5)),
        low: paintData?.filter(p => p.count <= (settingsData?.threshold_stock_low ?? 5)),
        out: paintData?.filter(p => p.count === 0),
      }
    : undefined;

  return (
    <>
      <Helmet title="Paints" />
      <LoadingOverlay visible={isLoading} />
      <Space mt={20} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title order={1}>Paint Stock</Title>
        {role === Role.ADMIN && <Button size="xs">Edit</Button>}
      </div>
      <Divider mb={20} />

      <Grid>
        <Grid.Col span={4}>
          <Header height={24}>Available</Header>
          <Stack mt={16}>
            {paints?.avail.map(p => (
              <PaintChip paint={p} />
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Header height={24}>Running Low</Header>
        </Grid.Col>
        <Grid.Col span={4}>
          <Header height={24}>Out of Stock</Header>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default PaintBoardPage;
