import {IsString} from 'class-validator';

export class ReverseGioDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly latitude: string;

  @IsString()
  readonly longitude: string;
}