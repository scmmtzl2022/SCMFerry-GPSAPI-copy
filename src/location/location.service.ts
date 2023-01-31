import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-location.dto';
import {
  UpdateActiveDto,
  UpdateLimitDto,
  UpdateLocationDto,
} from './dto/update.dto';
import { Location } from './entities/location.entity';
import * as moment from 'moment-timezone';

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
    // console.log('dto-=....',createLocationDto)
    return await this.locationRepository.save(createLocationDto);
  }
  async updateRoute(
    updateLocationDto: UpdateLocationDto,
    id: any,
  ): Promise<any> {
    console.log('.....', updateLocationDto)
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

  async findLatest(ferryNumber: any) {
    console.log("findLatest function :", ferryNumber);
     return this.locationRepository.findOneBy(ferryNumber);
    // console.log("ferryDataList :", ferryDataList);
    // console.log(moment().format('YYYY-MM-dd'));
    // let ferryData = ferryDataList.filter(
    //   (location) =>
    //     moment(location.dateTime).format('YYYY-MM-dd') ===
    //     moment().format('YYYY-MM-dd'),
    // );
    // return ferryData.length ? ferryData[0] : {};
  }
  async checkFerryNumber(payload: any): Promise<any> {
    return await this.locationRepository.find(payload);
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
