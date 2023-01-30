import { IsNotEmpty } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  data: Object;
  @IsNotEmpty()
  imeiNumber: string;
  @IsNotEmpty()
  ferryNumber: string;
  @IsNotEmpty()
  dateTime: string;
  @IsNotEmpty()
  isActive: boolean;
  @IsNotEmpty()
  isFullLimit: boolean;
}
