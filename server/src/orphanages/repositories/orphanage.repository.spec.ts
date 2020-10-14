import { OrphanageRepository } from './orphanage.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrphanageDTO } from '../dto/create-orphanage.dto';

const orphanageMock: CreateOrphanageDTO = {
  name: 'any_name',
  latitude: 0.0,
  longitude: 0.0,
  about: 'any_about',
  instructions: 'any_instructions',
  opening_hours: 'any_opening_hours',
  open_on_weekends: true,
};

const orphanageRepositoryMock = () => ({
  createOrphanage: jest.fn(),
});

describe('OrphanageRepository', () => {
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OrphanageRepository,
          useFactory: orphanageRepositoryMock,
        },
      ],
    }).compile();

    repository = module.get<OrphanageRepository>(OrphanageRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createOrphanage()', () => {
    it('should call createOrphanage() and return the result', async () => {
      const expectedResponse = 'any_value';
      repository.createOrphanage.mockResolvedValue(expectedResponse);
      const result = await repository.createOrphanage(orphanageMock);

      expect(repository.createOrphanage).toHaveBeenCalledWith(orphanageMock);
      expect(result).toBe(expectedResponse);
    });
  });
});
