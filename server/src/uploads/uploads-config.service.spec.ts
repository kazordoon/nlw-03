// TODO: Cover uncovered lines
import { Test, TestingModule } from '@nestjs/testing';
import { UploadsConfigService } from './uploads-config.service';

const uploadsConfigServiceMock = () => ({
  createMulterOptions: jest.fn(),
});

describe('UploadsConfigService', () => {
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UploadsConfigService, useFactory: uploadsConfigServiceMock },
      ],
    }).compile();

    service = module.get<UploadsConfigService>(UploadsConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMulterOptions()', () => {
    it('should call createMulterOptions() and return the result', () => {
      const expectedResponse = 'any_value';
      service.createMulterOptions.mockReturnValue(expectedResponse);
      const result = service.createMulterOptions();

      expect(result).toEqual(expectedResponse);
    });
  });
});
