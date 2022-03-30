import { Injectable } from '@nestjs/common';
import { Icon } from '@prisma/client';
import { btoa } from 'buffer';
import { JSDOM } from 'jsdom';
import { unescape } from 'querystring';
import { PrismaService } from './prisma.service';

@Injectable()
export class IconService {
  constructor(private prisma: PrismaService) {}

  async icons(params: {
    take: number;
    skip: number;
    name: string;
  }): Promise<{ result: Icon[]; total: number }> {
    const { take, skip, name } = params;
    const where = {
      name: {
        contains: name,
      },
    };

    const result = await this.prisma.icon.findMany({
      skip: skip * take,
      take,
      where,
    });
    const total = await this.prisma.icon.count({
      where,
    });

    return {
      result,
      total: +(total / take).toFixed(),
    };
  }

  async icon(params: { id: string }): Promise<Icon> {
    const { id } = params;
    return this.prisma.icon.findUnique({
      where: {
        id,
      },
    });
  }

  async iconBase64(params: { id: string }): Promise<string> {
    const { id } = params;
    const icon = await this.prisma.icon.findUnique({
      where: {
        id,
      },
    });
    const svg = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="${icon.data}" /></svg>`;
    const dom = new JSDOM(svg, { contentType: 'application/xml' });
    const DOMParser = dom.window.DOMParser;
    const parser = new DOMParser();
    const document = parser.parseFromString(svg, 'text/xml');

    const decoded = unescape(
      encodeURIComponent(document.documentElement.outerHTML),
    );
    const base64 = btoa(decoded);
    return `data:image/svg+xml;base64,${base64}`;
  }
}
