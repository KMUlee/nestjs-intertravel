import { existsSync, mkdirSync } from "fs";
import {diskStorage} from "multer";


export const multerOptions = {
    storage: diskStorage({
        destination: (req, file, cb) => {
            const uploadPath : string = '../inter-image';
            if(!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
}


        