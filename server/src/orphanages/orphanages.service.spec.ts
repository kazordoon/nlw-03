import { Test, TestingModule } from '@nestjs/testing';
import { OrphanagesService } from './orphanages.service';
import { OrphanageRepository } from './repositories/orphanage.repository';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';
import { NotFoundException } from '@nestjs/common';

const orphanagesRepositoryMock = () => ({
  createOrphanage: jest.fn(),
  find: jest.fn(),
  findOneOrFail: jest.fn(),
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
const orphanageIdMock = 1;

describe('OrphanagesService', () => {
  let service: OrphanagesService;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrphanagesService,
        {
          provide: OrphanageRepository,
          useFactory: orphanagesRepositoryMock,
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

  describe('getOne()', () => {
    it('should call orphanagesRepository.findOrFail() and return the result', async () => {
      const expectedResponse = 'any_value';
      repository.findOneOrFail.mockResolvedValue(expectedResponse);
      const result = await service.getOne(orphanageIdMock);

      expect(repository.findOneOrFail).toHaveBeenCalledWith(orphanageIdMock);
      expect(result).toBe('any_value');
    });

    it('should throw an error if an invalid id is provided', async () => {
      const expectedErrorMessage = 'Orphanage not found.';
      repository.findOneOrFail.mockRejectedValue(expectedErrorMessage);
      const invalidId = 1;
      const promise = service.getOne(invalidId);

      expect(promise).rejects.toThrow(
        new NotFoundException(expectedErrorMessage),
      );
    });
  });
});
