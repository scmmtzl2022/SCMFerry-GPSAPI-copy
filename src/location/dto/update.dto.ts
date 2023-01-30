import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @IsNotEmpty()
  data: Object;
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
