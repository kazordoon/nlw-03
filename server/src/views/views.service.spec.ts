/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ViewsService } from './views.service';
import { ConfigService } from '@nestjs/config';
import { Orphanage } from '../orphanages/entities/orphanage.entity';

const orphanageMock: Orphanage = {
  id: 1,
  name: 'any_name',
  about: 'any_about',
  instructions: 'any_instructions',
  opening_hours: 'any_opening_hours',
  open_on_weekends: true,
  geolocation: { x: 0, y: 0 },
  images: [
    {
      id: 1,
      path: 'any_path',
      orphanage: ('' as unknown) as Orphanage,
    },
  ],
};

describe('ViewsService', () => {
  let service: ViewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViewsService, ConfigService],
    }).compile();

    service = module.get<ViewsService>(ViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('renderOne()', () => {
    it('should call renderOne() and return the result', () => {
      const result = service.renderOne(orphanageMock);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('about');
      expect(result).toHaveProperty('images');
      expect(result).toHaveProperty('instructions');
      expect(result).toHaveProperty('latitude');
      expect(result).toHaveProperty('longitude');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('open_on_weekends');
      expect(result).toHaveProperty('opening_hours');
    });
  });

  describe('renderMany()', () => {
    it('should call renderMany() and return the result', () => {
      const viewsResult = service.renderMany([orphanageMock]);

      viewsResult.forEach(view => {
        expect(view).toHaveProperty('id');
        expect(view).toHaveProperty('about');
        expect(view).toHaveProperty('images');
        expect(view).toHaveProperty('instructions');
        expect(view).toHaveProperty('latitude');
        expect(view).toHaveProperty('longitude');
        expect(view).toHaveProperty('name');
        expect(view).toHaveProperty('open_on_weekends');
        expect(view).toHaveProperty('opening_hours');
      });
    });
  });
});
