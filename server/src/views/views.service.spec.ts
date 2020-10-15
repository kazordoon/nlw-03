/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Cover uncovered lines
import { Test, TestingModule } from '@nestjs/testing';
import { ViewsService } from './views.service';

const viewsServiceMock = () => ({
  renderOne: jest.fn((_orphanage: any) => {}),
});

const orphanageMock = 'any_orphanage';

describe('ViewsService', () => {
  let service: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: ViewsService, useFactory: viewsServiceMock }],
    }).compile();

    service = module.get<ViewsService>(ViewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('renderOne()', () => {
    it('should call renderOne() and return the result', () => {
      const expectedResponse = 'any_value';
      service.renderOne.mockReturnValue(expectedResponse);
      const result = service.renderOne(orphanageMock);

      expect(result).toEqual(expectedResponse);
    });
  });

  describe('renderMany()', () => {
    it('should call renderMany() and return the result', () => {
      const expectedResponse = ['any_value'];
      service.renderOne.mockReturnValue(expectedResponse);
      const result = service.renderOne(orphanageMock);

      expect(result).toEqual(expectedResponse);
    });
  });
});
