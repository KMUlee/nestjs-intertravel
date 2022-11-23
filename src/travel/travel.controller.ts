import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TravelListEntity } from 'src/entities/travelList.entity';
import { TravelService } from './travel.service';
import { TravelsEntity } from 'src/entities/travels.entity';

@Controller('travel')
export class TravelController {
  constructor(readonly travelService: TravelService) {}

  @Post('/list')
  async getTravelList(@Body() token: string) {
    return this.travelService.travelList(token);
  }
}
