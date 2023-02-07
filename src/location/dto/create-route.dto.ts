import { IsNotEmpty , Length} from 'class-validator';

export class CreateRouteDto {
  @Length(3, 255)
  ferry_no: string;

  @IsNotEmpty()
  @Length(3, 255)
  latitude: string;

  @IsNotEmpty()
  @Length(3, 255)
  longitude: string;

  @IsNotEmpty()
  @Length(3, 255)
  time_period: string;

  @IsNotEmpty()
  @Length(3, 255)
  datetime: string;

  @IsNotEmpty()
  @Length(3)
  is_active: boolean;
}
