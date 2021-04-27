import { Controller, Get } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

export interface ApplicationInfo {
  title: string;
  version: string;
}

@Controller()
export class AppController {

  constructor(private readonly configService: ConfigService) {
  }

  @Get()
  getInfo(): ApplicationInfo {
    return {
      title: this.configService.get('npm_package_name'),
      version: this.configService.get('npm_package_version'),
    };
  }
}
