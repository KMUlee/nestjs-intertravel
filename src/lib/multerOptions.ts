import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath: string = '../inter-image';
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
  const serverAddress: string = '';
  return `${serverAddress}/inter-image/${file.originalname}`;
};

export const changeImageName = (file): string => {
  return `${uuid()}${extname(file.originalname)}`;
};
