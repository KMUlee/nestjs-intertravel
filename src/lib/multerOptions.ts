import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve('.development.env'),
});

export const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath: string = './uploads';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, changeImageName(file));
    },
  }),
};

export const createImageURL = (file): string => {
  const serverAddress: string = process.env.SERVER_ADDRESS;
  return `${serverAddress}/${file.path}`;
};

export const changeImageName = (file): string => {
  return `${uuid()}${extname(file.originalname)}`;
};
