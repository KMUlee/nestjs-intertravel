import {  Injectable } from "@nestjs/common";

@Injectable()
export class UploadService {
    public uploadFile(file: string): string {
        const generatedFiles:string = file;
        return generatedFiles;
    }}
