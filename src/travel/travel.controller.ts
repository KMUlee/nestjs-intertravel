import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { travelCreateDto } from './dto/travelCreateDto.dto';
import { TravelService } from './travel.service';

@Controller('travel')
export class TravelController {
  constructor(readonly travelService: TravelService) {}

  @Post('/list')
  async getTravelList(@Body() body: JSON) {
    return this.travelService.travelList(body['token']);
  }

  @Post('/create')
  async createTravelList(@Body() travelData: travelCreateDto): Promise<void> {
    const { userToken, latitude, longitude, travelName, travelBody } =
      travelData;
    return this.travelService.createTravel(
      userToken,
      longitude,
      latitude,
      travelName,
      travelBody,
    );
  }
}
