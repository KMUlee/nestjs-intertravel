import { Bind, Body, Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';
import { multerOptions,createImageURL } from 'src/lib/multerOptions';
import { travelCreateDto } from './dto/travelCreateDto.dto';
import { travelUserTokenDto } from './dto/travelUserToken.dto';
import { TravelService } from './travel.service';
import { UploadService } from './upload.service';

@Controller('travel')
export class TravelController {
  constructor(readonly travelService: TravelService) {}

  @Post('/list')
  async getTravelList(@Body() dot:travelUserTokenDto):Promise<Object> {
    
    console.log("travel -> list",dot);
    const {userToken} = dot
    return this.travelService.travelList(userToken);
  } 

  @Post('/maps')
  async getMapsTravelList(@Body() body:travelUserTokenDto):Promise<Object> {
    const {userToken} = body;
    console.log("travel -> maps",userToken);
    return this.travelService.getMapsTravelList(userToken);
  }



  @Post('/create')
  async createTravelList(@Body() travelData: travelCreateDto): Promise<void> {
    const { userToken, latitude, longitude, travelName, travelBody,createdAt,mainImage } =
      travelData;
    console.log("travel create log :",travelData);
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
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async handleUpload(@UploadedFile() file: Express.Multer.File):Promise<string> {
    console.log(file);
    return createImageURL(file);
  }

}
