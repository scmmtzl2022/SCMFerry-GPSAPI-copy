import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { stringify } from 'qs';
import { URLSearchParams } from 'url';
import axios from 'axios';
import { response } from 'express';
import {
  apiURL,
  commonParam,
  getLocationParam,
  headers,
  tokenParam,
} from './config/app.config';
import { Cron } from '@nestjs/schedule';
import { LocationService } from './location/location.service';
import * as moment from 'moment-timezone';
import { AppGateway } from './app.gateway';

@Injectable()
export class AppService {
  constructor(
    private http: HttpService,
    private locationService: LocationService,
    private socket: AppGateway,
  ) {}
  private readonly logger = new Logger(AppService.name);
   @Cron('*/30 * 6,7 * * 1-5', {
    //  @Cron('*/10 * * * * 1-5', {
    timeZone: 'Asia/Yangon',
  })
  async handleCron() {
    this.logger.debug(
      'Called every 30 seconds ',
      moment().format('YYYY-MM-DD HH:mm:ss'),
    );
    let checkValidRoute = await this.checkValidRoute();
    if (checkValidRoute) {
      await this.getCurrentLocation();
    }
  }

  @Cron('0 0 8 * * 1-5', {
    timeZone: 'Asia/Yangon',
  })
  async activeHandler() {
    await this.setInactive();
    this.logger.debug('Set Inactive', moment().format('YYYY-MM-DD HH:mm:ss'));
  }

  //for Full Limit Testing

  // @Cron('0 46 * * * 1-5', {
  //   timeZone: 'Asia/Yangon',
  // })
  // async limitHandler() {
  //   let payload = {
  //     message: 'invalid token',
  //     dateTime: moment()
  //       .tz('Asia/Yangon')
  //       .format('YYYY-MM-DD HH:mm:ss')
  //       .toString(),
  //   };
  //   this.socket.fullLimit(payload);
  //   this.logger.debug('Set LimitFull', moment().format('YYYY-MM-DD HH:mm:ss'));
  // }

  async getAccessToken() {
    let now = moment().utc();

    let currentTimeinUTC = now.format('YYYY-MM-DD HH:mm:ss');
    commonParam.timestamp = currentTimeinUTC;
    const qs = new URLSearchParams(
      stringify({ ...commonParam, ...tokenParam }),
    );
    try {
      const response = await this.http
        .post(apiURL, qs.toString(), headers)
        .toPromise()
        .then(async (response) => {
          if (response.data.code === 0) {
            global.accessToken = response.data.result.accessToken;
          }
        });
    } catch (error) {
      console.error('error is ', error.response.data);
      throw new ForbiddenException(error.response.data);
    }
  }

  async getCurrentLocation() {
    console.log('AccessToken is', global.accessToken);
    let currentTimeinUTC = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    let currentTimeinTZ = moment()
      .tz('Asia/Yangon')
      .format('YYYY-MM-DD HH:mm:ss');
    commonParam.timestamp = currentTimeinUTC;
    let qs = new URLSearchParams(
      stringify({
        ...commonParam,
        ...getLocationParam,
        access_token: global.accessToken,
        // access_token: '464a54847b5e2eea3c4d6fc5d6cc6509',
      }),
    );
    try {
      const response = await this.http
        .post(apiURL, qs.toString(), headers)
        .toPromise()
        .then(async (response) => {
          let payload = {
            imeiList: response.data.result,
            dateTime: currentTimeinTZ.toString(),
          };
          if (response.data.code === 0) {
            const imeiList = payload.imeiList;
            imeiList.forEach((info) => {
              console.log(info.imei);
              this.socket.locationUpdate({
                location: info,
                imeiNumber: info.imei,
                dateTime: payload.dateTime,
              });
            });
          }
          return response;
        });
      return response.data;
    } catch (error) {
      console.error('error is ', error.response.data);
      if (error.response.data.code === 1004) {
        await this.getAccessToken();
      } else if (error.response.data.code === 1006) {
        let payload = {
          message: error.response.data.message,
          dateTime: currentTimeinTZ.toString(),
        };
        this.socket.fullLimit(payload);
      } else throw new ForbiddenException(error.response.data);
    }
  }
  async checkValidRoute() {
    let routeData = await this.locationService.findTodayRoutes();
    let checkData = routeData.filter((location) => {
      return location.isFullLimit === false && location.isActive === true;
    });
    if (checkData.length > 0 || routeData.length === 0) return true;
    else return false;
  }
  async setInactive() {
    let currentTimeinTZ = moment()
      .tz('Asia/Yangon')
      .format('YYYY-MM-DD HH:mm:ss');
    let payload = {
      message: 'Ferry is currently inactive',
      dateTime: currentTimeinTZ.toString(),
    };
    this.socket.ferryInactive(payload);
  }
}
