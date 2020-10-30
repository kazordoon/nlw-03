import { Readable } from 'stream';
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
const orphanageImagesMock: Express.Multer.File[] = [
  {
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
  },
];

describe('OrphanageRepository', () => {
  let repository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrphanageRepository],
    }).compile();

    repository = module.get<OrphanageRepository>(OrphanageRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createOrphanage()', () => {
    it('should call createOrphanage() and return the result', async () => {
      repository.create = jest.fn().mockReturnValue('any_value');
      repository.manager = {
        save: jest.fn(),
      };

      const result = await repository.createOrphanage(
        orphanageMock,
        orphanageImagesMock,
      );

      expect(repository.create).toBeCalledTimes(1);
      expect(repository.manager.save).toBeCalledTimes(1);
      expect(result).toEqual('any_value');
    });
  });
});
