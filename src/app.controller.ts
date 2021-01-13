import { Controller, Get } from '@nestjs/common';

import { name, version } from 'package.json';

export interface ApplicationInfo {
  title: string,
  apiVersion: string,
}

@Controller()
export class AppController {

  @Get()
  getInfo(): ApplicationInfo {
    return {
      title: name,
      apiVersion: version,
    };
  }
}
