import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-location.dto';
import { CreateRouteDto } from './create-route.dto';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {}
export class UpdateRouteDto extends PartialType(CreateRouteDto) {}
export class UpdateActiveRouteDto extends PartialType(CreateRouteDto) {}
