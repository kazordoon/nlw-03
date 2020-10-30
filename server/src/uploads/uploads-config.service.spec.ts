import { Readable } from 'stream';
import { UploadsConfigService } from './uploads-config.service';
import { UnprocessableEntityException } from '@nestjs/common';

describe('UploadsConfigService', () => {
  const service = new UploadsConfigService();
  let fileMock: Express.Multer.File;

  beforeEach(() => {
    fileMock = {
      path: 'any_path',
      size: 1,
      buffer: ('any_buffer' as unknown) as Buffer,
      fieldname: 'any_fieldname',
      stream: ('any_stream' as unknown) as Readable,
      encoding: 'any_encoding',
      filename: 'any_filename',
      mimetype: 'any_mimetype',
      destination: 'any_destination',
      originalname: 'any_originalname',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMulterOptions()', () => {
    describe('fileFilter()', () => {
      it('should call createMulterOptions() and return the fileFilter property', () => {
        const result = service.createMulterOptions();
        expect(result).toHaveProperty('fileFilter');
      });

      it('should call the fail callback', () => {
        const result = service.createMulterOptions();

        const req = {};
        const callback = jest.fn();
        result.fileFilter(req, fileMock, callback);

        expect(callback).toBeCalledWith(
          new UnprocessableEntityException('Invalid file type'),
          false,
        );
      });

      it('should call the success callback', () => {
        const result = service.createMulterOptions();

        const validMimeType = 'image/jpeg';
        const req = {};
        fileMock.mimetype = validMimeType;
        const callback = jest.fn();
        result.fileFilter(req, fileMock, callback);

        expect(callback).toBeCalledWith(null, true);
      });
    });

    describe('limits', () => {
      it('should call createMulterOptions() and return the limits property', () => {
        const result = service.createMulterOptions();
        expect(result).toHaveProperty('limits');
      });

      it('should have the fileSize property', () => {
        const result = service.createMulterOptions();

        expect(result.limits).toHaveProperty('fileSize');
      });
    });

    describe('storage', () => {
      it('should call createMulterOptions() and return the storage property', () => {
        const result = service.createMulterOptions();

        expect(result).toHaveProperty('storage');
      });

      it('should call getFilename()', () => {
        const multerOptions = service.createMulterOptions();

        const req = {};
        const file = fileMock;
        const callback = jest.fn();

        multerOptions.storage.getFilename(req, file, callback);

        expect(callback).toBeCalled();
      });

      it('should call getDestination()', () => {
        const multerOptions = service.createMulterOptions();

        const req = {};
        const file = fileMock;
        const callback = jest.fn();

        multerOptions.storage.getDestination(req, file, callback);

        expect(callback).toBeCalled();
      });
    });
  });
});
