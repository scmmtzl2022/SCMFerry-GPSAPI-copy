import { Controller, Get, Param, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
  @Get(':ferryNumber')
  @Render('location')
  joinRoom(@Param('ferryNumber') ferryNumber) {
    return { roomName: ferryNumber };
  }
}
