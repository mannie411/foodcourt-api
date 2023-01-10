import { Controller, Get } from '@nestjs/common';

export * from './auth';
export * from './brand';
export * from './user';

@Controller()
export class RootController {
  @Get()
  index() {
    return 'Welcome to foodcourt';
  }
  @Get('/api')
  api() {
    return 'Welcome to foodcourt';
  }
}
