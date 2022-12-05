import { IsString } from "class-validator";

export class travelUserTokenDto{
    @IsString()
    readonly userToken: string;
}