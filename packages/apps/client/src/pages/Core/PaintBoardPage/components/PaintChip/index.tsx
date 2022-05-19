import { ActionIcon, Card, Text } from '@mantine/core';
import { Edit } from 'tabler-icons-react';
import { getContrastYIQ } from '../../../../../common/utils/get-contrast-yiq.util';
import { Paint } from '../../../../../paint/dtos/paint.dto';

interface Props {
  paint: Paint;
}

export const PaintChip = ({ paint }: Props) => {
  const constrastingColor = getContrastYIQ(paint.hex);

  return (
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
        <ActionIcon variant="outline">
          <Edit color={constrastingColor} size={24} />
        </ActionIcon>
      </div>
    </Card>
  );
};
