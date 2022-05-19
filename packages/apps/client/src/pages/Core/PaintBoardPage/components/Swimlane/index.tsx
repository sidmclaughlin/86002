import { Header, Stack, Text } from '@mantine/core';
import { Paint } from '../../../../../paint/dtos/paint.dto';
import { PaintChip } from '../PaintChip';

interface Props {
  paints?: Paint[];
  title: string;
  subtitle?: string;
}

export const Swimlane = ({ paints, title, subtitle }: Props) => {
  return (
    <>
      <Header height={36}>
        {title}
        <br />
        <Text color={'gray'} size={'xs'}>
          {subtitle}
        </Text>
      </Header>
      <Stack mt={16}>
        {paints?.map(p => (
          <PaintChip key={p.id} paint={p} showEdit={true} />
        ))}
      </Stack>
    </>
  );
};
