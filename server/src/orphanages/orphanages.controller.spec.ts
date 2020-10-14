import { Test, TestingModule } from '@nestjs/testing';
import { OrphanagesController } from './orphanages.controller';
import { OrphanagesService } from './orphanages.service';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';

const mockOrphanagesService = () => ({
  create: jest.fn(),
  getAll: jest.fn(),
});

const orphanageMock: CreateOrphanageDTO = {
  name: 'any_name',
  latitude: 0.0,
  longitude: 0.0,
  about: 'any_about',
  instructions: 'any_instructions',
  opening_hours: 'any_opening_hours',
  open_on_weekends: true,
};

describe('OrphanagesController', () => {
  let controller: OrphanagesController;
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrphanagesController],
      providers: [
        {
          provide: OrphanagesService,
          useFactory: mockOrphanagesService,
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

      const result = await controller.store(orphanageMock);
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
});
