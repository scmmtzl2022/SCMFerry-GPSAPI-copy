import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateLocationDto } from './create-location.dto';
import { locationDataDto } from './location-data.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @IsNotEmpty()
  data: locationDataDto;
  @IsNotEmpty()
  dateTime: string;
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
