import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { RouteService } from './route.service';
  import { CreateRouteDto } from './dto/create-route.dto';
  import { Route } from './entities/location.entity';
  import * as ferry_data from '../res/json/ferry_data.json';
  
  @Controller('route')
  export class RouteController {
    constructor(private readonly RouteService: RouteService) {}
    @Get('/ferry-data')
    @UsePipes(ValidationPipe)
    async ferryData() {
      return ferry_data;
    }
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() CreateRouteDto: CreateRouteDto) {
      return this.RouteService.createNewRoute(CreateRouteDto);
    }
    // @Post('/get-location')
    // findLatestLocation(@Body() ferryNumber: any) {
    //   console.log("Ferry Number ",ferryNumber)
    //   return this.RouteService.findLatest(ferryNumber);
    // }
    @Post('/check-ferry-no')
    @UsePipes(ValidationPipe)
    async checkFerry(@Body() payload: any): Promise<Location> {
      return await this.RouteService.checkFerryNumber(payload);
    }
  }
  