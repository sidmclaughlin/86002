import { UpdatePaintDto } from '@86002/core-kit';
import { NumberOutlined } from '@ant-design/icons';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Button, NumberInput, Space } from '@mantine/core';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Paint } from '../../../../../paint/dtos/paint.dto';
import { useUpdatePaintMutation } from '../../../../../store/services/api.service';
import { PaintChip } from '../PaintChip';

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  paint: Paint;
}

export const EditForm = ({ paint, setModalVisible }: Props) => {
  const [updatePaint, { isLoading }] = useUpdatePaintMutation();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: classValidatorResolver(UpdatePaintDto),
    defaultValues: {
      count: paint.count,
    },
  });

  const onSubmit = async (values: Record<string, any>) => {
    await updatePaint({ id: paint.id, count: values.count });
    setModalVisible(false);
  };

  return (
    <>
      <PaintChip paint={paint} showEdit={false} />
      <Space h={16} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="count"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              size="sm"
              placeholder="Count"
              label="Count"
              error={errors.count && errors.count.message}
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
