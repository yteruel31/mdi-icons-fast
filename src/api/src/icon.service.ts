import { Injectable } from '@nestjs/common';
import { Icon } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class IconService {
  constructor(private prisma: PrismaService) {}

  async icons(params: {
    take: number;
    skip: number;
    name: string;
  }): Promise<Icon[]> {
    const { take, skip, name } = params;
    return this.prisma.icon.findMany({
      skip: skip * take,
      take,
      where: {
        name: {
          contains: name,
        },
      },
    });
  }

  async icon(params: { id: string }): Promise<Icon> {
    const { id } = params;
    return this.prisma.icon.findUnique({
      where: {
        id,
      },
    });
  }
}
