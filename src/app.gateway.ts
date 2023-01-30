import { Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import * as moment from 'moment-timezone';
import { Socket, Server } from 'socket.io';
import { LocationService } from './location/location.service';
import * as ferry_data from './res/json/ferry_data.json';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private locationService: LocationService) {
    moment.tz.setDefault('Asia/Yangon');
  }
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger(AppGateway.name);

  @SubscribeMessage('user-connect')
  connectRoom(client: Socket, payload: any) {
    this.logger.log(`Connected User : ${payload}`);
    client.join(payload.socket_id);
  }

  @SubscribeMessage('location-with-imei')
  async locationUpdate(
    @MessageBody()
    payload: {
      location: any;
      imeiNumber: string;
      dateTime: any;
    },
  ) {
    this.logger.log(`Updated location ${payload.location}`);
    const ferry = ferry_data.find((ferry) => {
      return ferry.imei_no === payload.imeiNumber;
    });
    this.server.to(ferry.ferry_no).emit(`location-with-imei`, {
      location: payload.location,
      ferryNumber: ferry.ferry_no,
      dateTime: payload.dateTime,
    });

    let routeData = await this.locationService.checkFerryNumber({
      ferryNumber: ferry.ferry_no,
    });
    let todayRoute = routeData.filter(
      (location) =>
        moment(location.dateTime).format('YYYY-MM-dd') ===
        moment().format('YYYY-MM-dd'),
    );
    if (todayRoute.length === 0) {
      await this.locationService.create({
        data: payload.location,
        dateTime: payload.dateTime,
        ferryNumber: ferry.ferry_no,
        imeiNumber: payload.imeiNumber,
        isActive: true,
        isFullLimit: false,
      });
    } else {
      this.locationService.updateRoute(
        {
          data: payload.location,
          dateTime: payload.dateTime,
        },
        todayRoute[0].id,
      );
    }
  }

  @SubscribeMessage('ferry-inactive')
  async ferryInactive(
    @MessageBody()
    payload: any,
  ) {
    let routeData = await this.locationService.findTodayRoutes();
    routeData.forEach((route) => {
      this.locationService.updateActive(
        {
          isActive: false,
          dateTime: payload.dateTime,
        },
        route.id,
      );
    });
    this.server.emit(`ferry-inactive`, payload);
  }

  @SubscribeMessage('full-limit')
  async fullLimit(
    @MessageBody()
    payload: any,
  ) {
    let routeData = await this.locationService.findTodayRoutes();
    routeData.forEach(async (location) => {
      await this.locationService.updateFullLimit(
        {
          isFullLimit: true,
          dateTime: payload.dateTime,
        },
        location.id,
      );
    });
    this.server.emit(`full-limit`, payload);
  }

  @SubscribeMessage('get-client-count')
  async clientCount(client: Socket, payload: any) {
    const sockets = await this.server.fetchSockets();
    console.log(sockets.length);
    this.server.emit(`client-count`, {
      count: sockets.length,
    });
  }

  @SubscribeMessage('join-room')
  async handleJoinRoom(
    @MessageBody()
    payload: {
      roomName: string;
      socketId: string;
    },
  ) {
    const sockets = await this.server.in(payload.roomName).fetchSockets();
    if (payload.socketId) {
      this.logger.log(`${payload.socketId} is joining ${payload.roomName}`);
      this.server.in(payload.socketId).socketsJoin(payload.roomName);
      this.server.to(payload.roomName).emit(`client-count-byRoom`, {
        count: sockets.length,
      });
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleDisconnect(client: Socket) {
    const sockets = await this.server.fetchSockets();
    this.server.emit(`client-count`, {
      count: sockets.length,
    });

    this.logger.log(`Client disconnected: ${client.id}`);
    this.logger.debug(`Connected Client Count: ${sockets.length} `);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const sockets = await this.server.fetchSockets();
    this.server.emit(`client-count`, {
      count: sockets.length,
    });
    this.logger.log(`Client connected: ${client.id} `);
    this.logger.debug(`Connected Client Count: ${sockets.length} `);
  }
}
