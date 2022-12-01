import {
  Bind,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import { multerOptions } from 'src/lib/multerOptions';
import { travelCreateDto } from './dto/travelCreateDto.dto';
import { TravelService } from './travel.service';
import { UploadService } from './upload.service';

@Controller('travel')
export class TravelController {
  constructor(readonly travelService: TravelService) {}

  @Post('/list')
  async getTravelList(@Body() dot): Promise<object> {
    console.log(dot);
    return this.travelService.travelList(dot.token);
  }

  @Post('/maps')
  async getMapsTravelList(@Body() body): Promise<object> {
    return this.travelService.getMapsTravelList(body.token);
  }

  @Post('/create')
  async createTravelList(@Body() travelData: travelCreateDto): Promise<void> {
    const {
      userToken,
      latitude,
      longitude,
      travelName,
      travelBody,
      createdAt,
      mainImage,
    } = travelData;
    const data = await this.travelService.uploadFileDisk(mainImage);
    console.log('this is data :', data);
    return this.travelService.createTravel(
      userToken,
      longitude,
      latitude,
      travelName,
      travelBody,
      createdAt,
      data,
    );
  }
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  handleUpload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file.path;
  }
}
