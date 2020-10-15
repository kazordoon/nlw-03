import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { OrphanagesService } from './orphanages.service';
import { ViewsService } from '../views/views.service';
import { OrphanageRepository } from './repositories/orphanage.repository';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';

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
const orphanageImagesMock = [] as Express.Multer.File[];

const viewsServiceMock = () => ({
  renderOne: jest.fn(),
  renderMany: jest.fn(),
});

const invalidId = 1;
const anyId = 1;

describe('OrphanagesService', () => {
  let orphanagesService: OrphanagesService;
  let viewsService: any;
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrphanagesService,
        {
          provide: ViewsService,
          useFactory: viewsServiceMock,
        },
        {
          provide: OrphanageRepository,
          useFactory: orphanagesRepositoryMock,
        },
      ],
    }).compile();

    orphanagesService = module.get<OrphanagesService>(OrphanagesService);
    viewsService = module.get<ViewsService>(ViewsService);
    repository = module.get<OrphanageRepository>(OrphanageRepository);
  });

  it('should be defined', () => {
    expect(orphanagesService).toBeDefined();
  });

  describe('create()', () => {
    it('should call orphanagesRepository.createOrphanage() and return the result', async () => {
      const expectedResponse = 'any_value';
      repository.createOrphanage.mockResolvedValue(expectedResponse);

      const result = await orphanagesService.create(
        orphanageMock,
        orphanageImagesMock,
      );

      expect(repository.createOrphanage).toHaveBeenCalledWith(
        orphanageMock,
        orphanageImagesMock,
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getAll()', () => {
    it('should call orphanagesRepository.find()', async () => {
      await orphanagesService.getAll();

      expect(repository.find).toHaveBeenCalled();
    });

    it('should call viewsService.renderMany() and return the result', async () => {
      const expectedResponse = ['any_value'];
      viewsService.renderMany.mockReturnValue(expectedResponse);
      repository.find.mockResolvedValue(expectedResponse);

      const result = await orphanagesService.getAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('getOne()', () => {
    it('should call orphanagesRepository.findOrFail()', async () => {
      await orphanagesService.getOne(anyId);

      expect(repository.findOneOrFail).toHaveBeenCalledWith(anyId);
    });

    it('should call viewsService.renderOne() and return the result', async () => {
      const expectedResponse = 'any_value';
      viewsService.renderOne.mockReturnValue(expectedResponse);
      repository.findOneOrFail.mockResolvedValue(expectedResponse);

      const result = await orphanagesService.getOne(anyId);

      expect(repository.findOneOrFail).toHaveBeenCalledWith(anyId);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw an error if an invalid id is provided', async () => {
      const expectedErrorMessage = 'Orphanage not found.';
      repository.findOneOrFail.mockRejectedValue(expectedErrorMessage);
      const promise = orphanagesService.getOne(invalidId);

      expect(promise).rejects.toThrow(
        new NotFoundException(expectedErrorMessage),
      );
    });
  });
});
