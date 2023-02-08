import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { CreateLocationDto  } from './dto/create-location.dto';
import { CreateRouteDto } from './dto/create-route.dto';
import {
  UpdateActiveDto,
  UpdateLimitDto,
  UpdateLocationDto,
} from './dto/update.dto';
import { Location } from './entities/location.entity';
import * as moment from 'moment-timezone';
import { Route } from './entities/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {
    moment.tz.setDefault('Asia/Yangon');
  }

  async getAllRoute(): Promise<Location[]> {
    return await this.locationRepository.find();
  }
  async create(createLocationDto: CreateLocationDto): Promise<any> {
    return await this.locationRepository.save(createLocationDto);
  }
  async updateRoute(
    updateLocationDto: UpdateLocationDto,
    id: any,
  ): Promise<any> {
    return await this.locationRepository.update(id, updateLocationDto);
  }

  async updateFullLimit(
    updateFullLimitDto: UpdateLimitDto,
    id: any,
  ): Promise<any> {
    return await this.locationRepository.update(id, updateFullLimitDto);
  }
  async updateActive(updateActiveDto: UpdateActiveDto, id: any): Promise<any> {
    return await this.locationRepository.update(id, updateActiveDto);
  }

  async findLatest(ferryNumber: string) {
    let ferryDataList = await this.locationRepository.findOne({
      where : {
        ferryNumber: ferryNumber
      },
      order: {
            id: "DESC" 
    }
    });
    return ferryDataList;
  }
  async checkFerryNumber(payload: any): Promise<any> {
    return await this.locationRepository.find({
      where: payload
    });
  }
  async findTodayRoutes() {
    let allRoutes = await this.locationRepository.find();
    let todayRoute = allRoutes.filter(
      (location) =>
        moment(location.dateTime).format('YYYY-MM-dd') ===
        moment().format('YYYY-MM-dd'),
    );
    return todayRoute;
  }
}
