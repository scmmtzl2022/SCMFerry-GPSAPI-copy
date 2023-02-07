import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto  } from './dto/create-location.dto';
import { CreateRouteDto } from './dto/create-route.dto';
import {
  UpdateActiveDto,
  UpdateLimitDto,
  UpdateRouteDto,
  UpdateActiveRouteDto,
} from './dto/update.dto';
import { Location } from './entities/location.entity';
import * as moment from 'moment-timezone';
import { Route } from './entities/location.entity';
import { RouteRepository } from './repositories/route.repository';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
  ) {
    moment.tz.setDefault('Asia/Yangon');
  }

  async getAllRoute(): Promise<Route[]> {
    return await this.routeRepository.find();
  }
  async createNewRoute(payload: CreateRouteDto): Promise<any> {
    return await this.routeRepository.save(payload);
  }

  async checkFerryNumber(payload: any): Promise<any> {
    return await this.routeRepository.find({
      where: payload
    });
  }
  async updateRoute(payload: UpdateRouteDto, id: any): Promise<any> {
    return await this.routeRepository.update(id, payload);
  }
  async driverStopLocation(
    payload: UpdateActiveRouteDto,
    id: any,
  ): Promise<InstanceType<any>> {
    const routes = await this.routeRepository.find({
      where: { ferry_no: id, is_active: true },
    });
    console.log('Route ', routes);
    routes.forEach((route) => {
      route.datetime = payload.datetime;
      route.is_active = payload.is_active;
      route.save();
    });
  }
}
