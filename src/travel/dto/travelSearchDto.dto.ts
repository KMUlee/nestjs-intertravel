import { IsString } from "class-validator";

export class travelSearchDto{
    @IsString()
    readonly userToken: string;

    @IsString()
    readonly search: string;
}