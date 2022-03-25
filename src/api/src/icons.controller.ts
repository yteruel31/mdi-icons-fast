import { Controller, Get, Query, Param } from '@nestjs/common';
import { IconService } from './icon.service';

@Controller('icons')
export class IconsController {
  constructor(private iconService: IconService) {}

  @Get()
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
}
