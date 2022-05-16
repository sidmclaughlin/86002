import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { Authorize } from 'src/authorization/decorators/authorize.decorator';
import { Role } from 'src/authorization/enums/role.enum';
import { FindOneParams } from 'src/common/dtos/find-one-params.dto';
import { UpdatePaintDto } from 'src/paint/dtos/update-paint.dto';
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

  @Patch(':id')
  @Authorize(Role.Editor)
  async updatePaint(@Param() params: FindOneParams, @Body() data: UpdatePaintDto) {
    return await this.paintService.updatePaint(parseInt(params.id, 10), data);
  }
}
