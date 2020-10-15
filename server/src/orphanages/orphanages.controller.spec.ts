/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { OrphanagesController } from './orphanages.controller';
import { OrphanagesService } from './orphanages.service';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';

const orphanagesServiceMock = () => ({
  create: jest.fn(),
  getAll: jest.fn(),
  getOne: jest.fn((id: number) => {}),
});

const orphanageImagesMock = [] as Express.Multer.File[];

const orphanageMock: CreateOrphanageDTO = {
  name: 'any_name',
  latitude: 0.0,
  longitude: 0.0,
  about: 'any_about',
  instructions: 'any_instructions',
  opening_hours: 'any_opening_hours',
  open_on_weekends: true,
};
const orphanageIdMock = 1;

describe('OrphanagesController', () => {
  let controller: OrphanagesController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrphanagesController],
      providers: [
        {
          provide: OrphanagesService,
          useFactory: orphanagesServiceMock,
        },
      ],
    }).compile();

    service = module.get<OrphanagesService>(OrphanagesService);
    controller = module.get<OrphanagesController>(OrphanagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('store()', () => {
    it('should call store() and return the result', async () => {
      const expectedResponse = 'any_value';
      service.create.mockResolvedValue(expectedResponse);

      const result = await controller.store(orphanageMock, orphanageImagesMock);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('index()', () => {
    it('should call index() and return the result', async () => {
      const expectedResponse = ['any_value'];
      service.getAll.mockResolvedValue(expectedResponse);
      const result = await controller.index();

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('show()', () => {
    it('should call show() and return the result', async () => {
      const expectedResponse = 'any_value';
      service.getOne.mockResolvedValue(expectedResponse);
      const result = await controller.show(orphanageIdMock);

      expect(result).toEqual('any_value');
    });
  });
});
