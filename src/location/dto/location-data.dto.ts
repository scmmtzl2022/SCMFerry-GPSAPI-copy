import { Double } from "typeorm";
export class locationDataDto {
    imei: string;
    deviceName: string;
    icon: string;
    status: string;
    posType: string;
    lat: Double;
    lng: Double;
    hbTime: string;
    accStatus: string;
    powerValue: string;
    speed: string;
    gpsNum: string;
    gpsTime: string;
    direction: string;
    activationFlag: string;
    expireFlag: string;
    electQuantity: string;
    locDesc:string;
    distance: Double;
    temperature:string;
}