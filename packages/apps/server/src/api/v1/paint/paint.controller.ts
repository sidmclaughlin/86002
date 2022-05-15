import { Controller, Get, Param } from '@nestjs/common';
import { FindOneParams } from 'src/common/dtos/find-one-params.dto';
import { PaintService } from 'src/paint/paint.service';

@Controller({
  path: 'paints',
  version: '1',
})
export class PaintController {
  constructor(private readonly paintService: PaintService) {}

  @Get()
  async getPaints() {
    return await this.paintService.getPaints();
  }

  @Get(':id')
  async getPaint(@Param() params: FindOneParams) {
    return await this.paintService.getPaint(parseInt(params.id, 10));
  }
}
