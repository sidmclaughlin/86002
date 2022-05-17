import { IsNumber, Min } from 'class-validator';

export class UpdateSettingsDto {
  @IsNumber()
  @Min(1)
  threshold_stock_low!: number;
}
