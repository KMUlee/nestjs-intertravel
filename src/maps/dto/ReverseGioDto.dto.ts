import {IsString} from 'class-validator';

export class ReverseGioDto {
  @IsString()
  readonly id: string;

  
  readonly latitude: any;

  
  readonly longitude: any;
}