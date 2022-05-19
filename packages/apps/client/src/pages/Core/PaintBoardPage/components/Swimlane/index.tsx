import { Header, Stack } from '@mantine/core';
import { Paint } from '../../../../../paint/dtos/paint.dto';
import { PaintChip } from '../PaintChip';

interface Props {
  paints?: Paint[];
  title: string;
}

export const Swimlane = ({ paints, title }: Props) => {
  return (
    <>
      <Header height={36}>{title}</Header>
      <Stack mt={16}>
        {paints?.map(p => (
          <PaintChip key={p.id} paint={p} showEdit={true} />
        ))}
      </Stack>
    </>
  );
};
