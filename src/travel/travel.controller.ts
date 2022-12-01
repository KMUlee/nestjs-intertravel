import { Bind, Body, Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { multerOptions } from 'src/lib/multerOptions';
import { travelCreateDto } from './dto/travelCreateDto.dto';
import { TravelService } from './travel.service';
import { UploadService } from './upload.service';

@Controller('travel')
export class TravelController {
  constructor(readonly travelService: TravelService) {}

  @Post('/list')
  async getTravelList(@Body() dot):Promise<Object> {
    console.log(dot);
    return this.travelService.travelList(dot.token);
  } 

  @Post('/maps')
  async getMapsTravelList(@Body() body):Promise<Object> {
    return this.travelService.getMapsTravelList(body.token);
  }



  @Post('/create')
  @UseInterceptors(FilesInterceptor('images',null,multerOptions))
  async createTravelList(@Body() travelData: travelCreateDto): Promise<void> {
    const { userToken, latitude, longitude, travelName, travelBody,createdAt,mainImage } =
      travelData;
      const imageUrl = UploadService.uploadService.uploadFile(mainImage);
    return this.travelService.createTravel(
      userToken,
      longitude,
      latitude,
      travelName,
      travelBody,
      createdAt,
      imageUrl,
    );
  }
  

}
