import {IsString} from 'class-validator';

export class ReverseGioDto {
  @IsString()
  readonly id: string;

  
  readonly latitude: string;

  
  readonly longitude: string;
}