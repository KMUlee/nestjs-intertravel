import { IsString } from 'class-validator';

export class CreateLibrayDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly latitude: string;

  @IsString()
  readonly longitude: string;

  @IsString()
  readonly text: string;
}
