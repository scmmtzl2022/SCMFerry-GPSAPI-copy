import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './entities/location.entity';
import * as ferry_data from '../res/json/ferry_data.json';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @Get('/ferry-data')
  @UsePipes(ValidationPipe)
  async ferryData() {
    return ferry_data;
  }
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }
  @Post('/get-location')
  findLatestLocation(@Body() ferryNumber: any) {
    console.log("Ferry Number ",ferryNumber)
    return this.locationService.findLatest(ferryNumber);
  }
  @Post('/check-ferry-no')
  @UsePipes(ValidationPipe)
  async checkFerry(@Body() payload: any): Promise<Location> {
    return await this.locationService.checkFerryNumber(payload);
  }
}
