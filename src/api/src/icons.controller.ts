import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { IconService } from './icon.service';

@Controller('icons')
export class IconsController {
  constructor(private iconService: IconService) {}

  @Get()
  @ApiImplicitQuery({ name: 'name', required: false, type: String })
  async getIcons(
    @Query('skip') skip: string,
    @Query('take') take: string,
    @Query('name') name: string,
  ) {
    return this.iconService.icons({ skip: +skip, take: +take, name });
  }

  @Get(':id')
  async getIcon(@Param('id') id: string) {
    return this.iconService.icon({ id });
  }

  @Get(':id/base64')
  async getIconBase64(@Param('id') id: string) {
    return this.iconService.iconBase64({ id });
  }
}
