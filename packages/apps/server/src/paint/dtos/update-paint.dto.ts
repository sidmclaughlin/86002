import { IsNumber } from 'class-validator';

export class UpdatePaintDto {
  @IsNumber()
  count!: number;
}
