import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { MapsService } from "./maps.service";
import { ReverseGioDto } from "./dto/ReverseGioDto.dto";
@Controller('maps')
export class mapsController {
  constructor(readonly mapsService: MapsService) {}

  @Get(":test")
  async test(@Param('test') testData:string): Promise<string> {
    return this.mapsService.testFunction(testData);
  }

  @Post("/reversegio")
  async reverseGio(@Body() reverseGioData: ReverseGioDto): Promise<string> {
    console.log(reverseGioData);
    const { id, latitude, longitude } = reverseGioData;
    return this.mapsService.reverseGio(id, latitude, longitude);
  }
}