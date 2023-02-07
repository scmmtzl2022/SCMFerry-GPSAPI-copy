import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty , Length} from 'class-validator';
import { CreateLocationDto } from './create-location.dto';
import { locationDataDto } from './location-data.dto';
import { CreateRouteDto } from './create-route.dto'

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @IsNotEmpty()
  data: locationDataDto;
  @IsNotEmpty()
  dateTime: string;
}
export class UpdateRouteDto extends PartialType(CreateRouteDto) {
  @IsNotEmpty()
  @Length(3, 255)
  latitude: string;

  @IsNotEmpty()
  @Length(3, 255)
  longitude: string;
}

export class UpdateActiveDto {
  @IsNotEmpty()
  isActive: boolean;
  dateTime: string;
}
export class UpdateLimitDto {
  @IsNotEmpty()
  isFullLimit: boolean;
  dateTime: string;
}

export class UpdateActiveRouteDto extends PartialType(CreateRouteDto){
  @IsNotEmpty()
  @Length(3)
  is_active: boolean;
  datetime: string;
}
