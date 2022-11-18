import { Injectable } from "@nestjs/common";

@Injectable()
export class MapsService {
  async testFunction(testData: String): Promise<string> {
    return "test";
  }
}