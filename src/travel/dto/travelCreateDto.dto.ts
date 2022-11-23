import { IsLatitude, IsLongitude, IsString } from 'class-validator';

export class travelCreateDto {
  @IsString()
  readonly userToken: string;

  @IsLatitude()
  readonly latitude: number;

  @IsLongitude()
  readonly longitude: number;

  @IsString()
  readonly travelName: string;

  @IsString()
  readonly travelBody: string;
}
