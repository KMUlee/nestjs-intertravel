import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { TravelService } from './travel.service';

@Controller('travel')
export class TravelController {
  constructor(readonly travelService: TravelService) {}

  @Post('/list')
  async getTravelList(@Body() token: string) {
    return this.travelService.travelList(token);
  }
}
