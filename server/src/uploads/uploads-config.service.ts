import * as path from 'path';
import * as crypto from 'crypto';
import * as multer from 'multer';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';

const oneKilobyte = 1024;
const oneMegabyte = oneKilobyte ** 2;
const twoMegabytes = oneMegabyte * 2;

@Injectable()
export class UploadsConfigService implements MulterOptionsFactory {
  public createMulterOptions(): MulterModuleOptions {
    return {
      fileFilter: (_req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new UnprocessableEntityException('Invalid file type'), false);
        }
      },
      limits: {
        fileSize: twoMegabytes,
      },
      storage: multer.diskStorage({
        filename(_req, file, cb) {
          const hash = crypto.randomBytes(10).toString('hex');
          const filename = `${hash}-${file.originalname}`;
          return cb(null, filename);
        },
        destination(_req, _file, cb) {
          return cb(null, path.join(__dirname, '..', '..', 'tmp', 'uploads'));
        },
      }),
    };
  }
}
