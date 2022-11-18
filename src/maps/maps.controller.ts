import { Controller, Get, Param } from "@nestjs/common";
import { MapsService } from "./maps.service";

@Controller('maps')
export class mapsController {
  constructor(readonly mapsService: MapsService) {}

  @Get(":test")
  async test(@Param('test') testData:String): Promise<string> {
    return this.mapsService.testFunction(testData);
  }
}