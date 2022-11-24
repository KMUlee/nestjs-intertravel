import { Bind, Body, Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { travelCreateDto } from './dto/travelCreateDto.dto';
import { TravelService } from './travel.service';

@Controller('travel')
export class TravelController {
  constructor(readonly travelService: TravelService) {}

  @Post('/list')
  async getTravelList(@Body() body: JSON):Promise<Object> {
    console.log('travel/list Post ->', body);
    return this.travelService.travelList(body['token']);
  } 

  @Post('/maps')
  async getMapsTravelList(@Body() body: JSON):Promise<Object> {
    return this.getMapsTravelList(body['token']);
  }
  @Post('/create')
  async createTravelList(@Body() travelData: travelCreateDto): Promise<void> {
    const { userToken, latitude, longitude, travelName, travelBody,createdAt,mainImage } =
      travelData;
    return this.travelService.createTravel(
      userToken,
      longitude,
      latitude,
      travelName,
      travelBody,
      createdAt,
      mainImage,
    );
  }
}
