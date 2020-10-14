import { Test, TestingModule } from '@nestjs/testing';
import { OrphanagesService } from './orphanages.service';
import { OrphanageRepository } from './repositories/orphanage.repository';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';

const mockOrphanagesRepository = () => ({
  createOrphanage: jest.fn(),
  find: jest.fn(),
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

describe('OrphanagesService', () => {
  let service: OrphanagesService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrphanagesService,
        {
          provide: OrphanageRepository,
          useFactory: mockOrphanagesRepository,
        },
      ],
    }).compile();

    service = module.get<OrphanagesService>(OrphanagesService);
    repository = module.get<OrphanageRepository>(OrphanageRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should call orphanagesRepository.createOrphanage() and return the result', async () => {
      const expectedResponse = { id: 'any_id' };
      repository.createOrphanage.mockResolvedValue(expectedResponse);

      const result = await service.create(orphanageMock);

      expect(repository.createOrphanage).toHaveBeenCalledWith(orphanageMock);
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getAll()', () => {
    it('should call orphanagesRepository.find() and return the result', async () => {
      const expectedResponse = ['any_value'];
      repository.find.mockResolvedValue(expectedResponse);
      const result = await service.getAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });
  });
});
