import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IconService } from './icon.service';
import { IconsController } from './icons.controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, IconsController],
  providers: [AppService, IconService, PrismaService],
})
export class AppModule {}
