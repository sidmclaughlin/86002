import { ActionIcon, Card, Modal, Text } from '@mantine/core';
import { useState } from 'react';
import { Edit } from 'tabler-icons-react';
import { Role } from '../../../../../authentication/dtos/user.dto';
import { getContrastYIQ } from '../../../../../common/utils/get-contrast-yiq.util';
import { Paint } from '../../../../../paint/dtos/paint.dto';
import { useAppSelector } from '../../../../../store/hooks';
import { EditForm } from '../EditForm';

interface Props {
  showEdit: boolean;
  paint: Paint;
}

export const PaintChip = ({ showEdit = true, paint }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const user = useAppSelector(state => state.authentication.user);

  const constrastingColor = getContrastYIQ(paint.hex);

  return (
    <>
      {showEdit && (
        <Modal opened={modalVisible} onClose={() => setModalVisible(false)} title="Update Quantity">
          <EditForm setModalVisible={setModalVisible} paint={paint} />
        </Modal>
      )}
      <Card
        key={paint.hex}
        sx={theme => ({
          backgroundColor: paint.hex,
          border: `1px solid ${theme.colors.gray[2]}`,
        })}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: constrastingColor }}>
            <Text>{paint.name}</Text>
            <Text size={'xs'}>Qty: {paint.count}</Text>
          </div>
          {showEdit && user != null && (user.role === Role.ADMIN || user.role === Role.EDITOR) && (
            <ActionIcon variant="outline">
              <Edit onClick={() => setModalVisible(true)} color={constrastingColor} size={24} />
            </ActionIcon>
          )}
          {/* {(showEdit &&
            user != null && [Role.ADMIN, Role.EDITOR].includes(user.role)) && (
              <ActionIcon variant="outline">
                <Edit onClick={() => setModalVisible(true)} color={constrastingColor} size={24} />
              </ActionIcon>,
            )} */}
        </div>
      </Card>
    </>
  );
};
