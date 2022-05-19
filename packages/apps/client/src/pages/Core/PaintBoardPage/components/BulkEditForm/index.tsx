import { NumberOutlined } from '@ant-design/icons';
import { Button, NumberInput, Space } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { Paint } from '../../../../../paint/dtos/paint.dto';
import { useUpdatePaintMutation } from '../../../../../store/services/api.service';
import { PaintChip } from '../PaintChip';

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  paints?: Paint[];
}

export const BulkEditForm = ({ setModalVisible, paints }: Props) => {
  const [updatePaint, { isLoading }] = useUpdatePaintMutation();

  const bluePaint = paints!.find(paint => paint.name === 'Blue')!;
  const greyPaint = paints!.find(paint => paint.name === 'Grey')!;
  const blackPaint = paints!.find(paint => paint.name === 'Black')!;
  const whitePaint = paints!.find(paint => paint.name === 'White')!;
  const purplePaint = paints!.find(paint => paint.name === 'Purple')!;

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      blue_id: bluePaint.id,
      blue_count: bluePaint.count,
      grey_id: greyPaint.id,
      grey_count: greyPaint.count,
      black_id: blackPaint.id,
      black_count: blackPaint.count,
      white_id: whitePaint.id,
      white_count: whitePaint.count,
      purple_id: purplePaint.id,
      purple_count: purplePaint.count,
    },
  });

  const onSubmit = async (values: Record<string, any>) => {
    if (bluePaint.count !== values.blue_count) await updatePaint({ id: values.blue_id, count: values.blue_count });
    if (greyPaint.count !== values.grey_count) await updatePaint({ id: values.grey_id, count: values.grey_count });
    if (blackPaint.count !== values.black_count) await updatePaint({ id: values.black_id, count: values.black_count });
    if (whitePaint.count !== values.white_count) await updatePaint({ id: values.white_id, count: values.white_count });
    if (purplePaint.count !== values.purple_count)
      await updatePaint({ id: values.purple_id, count: values.purple_count });

    setModalVisible(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space h={16} />
        {/* Blue */}
        <PaintChip paint={bluePaint} showEdit={false} />
        <Space h={16} />
        <Controller
          name="blue_count"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              size="sm"
              placeholder="Count"
              label="Count"
              icon={<NumberOutlined style={{ fontSize: '16px' }} />}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              min={0}
            />
          )}
        />
        <Space h={16} />
        {/* Grey */}
        <PaintChip paint={greyPaint} showEdit={false} />
        <Space h={16} />
        <Controller
          name="grey_count"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              size="sm"
              placeholder="Count"
              label="Count"
              icon={<NumberOutlined style={{ fontSize: '16px' }} />}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              min={0}
            />
          )}
        />
        <Space h={16} />
        {/* Black */}
        <PaintChip paint={blackPaint} showEdit={false} />
        <Space h={16} />
        <Controller
          name="black_count"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              size="sm"
              placeholder="Count"
              label="Count"
              icon={<NumberOutlined style={{ fontSize: '16px' }} />}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              min={0}
            />
          )}
        />
        <Space h={16} />
        {/* White */}
        <PaintChip paint={whitePaint} showEdit={false} />
        <Space h={16} />
        <Controller
          name="white_count"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              size="sm"
              placeholder="Count"
              label="Count"
              icon={<NumberOutlined style={{ fontSize: '16px' }} />}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              min={0}
            />
          )}
        />
        <Space h={16} />
        {/* Purple */}
        <PaintChip paint={purplePaint} showEdit={false} />
        <Space h={16} />
        <Controller
          name="purple_count"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              size="sm"
              placeholder="Count"
              label="Count"
              icon={<NumberOutlined style={{ fontSize: '16px' }} />}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              min={0}
            />
          )}
        />

        <Space h="xs" />
        <Button fullWidth loading={isLoading} size="xs" type="submit">
          Update Stock
        </Button>
      </form>
    </>
  );
};

// blue, grey, black, white, purple;
