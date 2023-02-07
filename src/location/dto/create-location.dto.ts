import { IsNotEmpty , Length} from 'class-validator';
import { locationDataDto } from './location-data.dto';

export class CreateLocationDto {
  @IsNotEmpty()
  data: locationDataDto;
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