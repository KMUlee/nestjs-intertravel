import { IsLatitude, IsLongitude, IsString } from 'class-validator';

export class ReverseGioDto {
  @IsString()
  readonly id: string;

  @IsLatitude()
  readonly latitude: string;

  @IsLongitude()
  readonly longitude: string;
}
