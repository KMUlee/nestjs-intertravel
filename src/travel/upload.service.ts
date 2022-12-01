import {  Injectable } from "@nestjs/common";

@Injectable()
export class UploadService {
    static uploadService: any;
    public uploadFile(file: string): string {
        const generatedFiles:string = file;
        return generatedFiles;
    }}
