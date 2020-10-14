import { Test, TestingModule } from '@nestjs/testing';
import { OrphanagesService } from './orphanages.service';
import { OrphanageRepository } from './repositories/orphanage.repository';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';

const mockOrphanagesRepository = () => ({
  createOrphanage: jest.fn(),
});

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
    it('should calls orphanagesRepository and return the result', async () => {
      const expectedResponse = { id: 'any_id' };
      repository.createOrphanage.mockResolvedValue(expectedResponse);

      const createOrphanageDTO: CreateOrphanageDTO = {
        name: 'any_name',
        latitude: 0.0,
        longitude: 0.0,
        about: 'any_about',
        instructions: 'any_instructions',
        opening_hours: 'any_opening_hours',
        open_on_weekends: true,
      };
      const result = await service.create(createOrphanageDTO);

      expect(repository.createOrphanage).toHaveBeenCalledWith(
        createOrphanageDTO,
      );
      expect(result).toEqual(expectedResponse);
    });
  });
});
