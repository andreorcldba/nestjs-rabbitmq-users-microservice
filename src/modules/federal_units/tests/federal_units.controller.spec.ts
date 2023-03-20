import { Test, TestingModule } from '@nestjs/testing';
import { FederalUnitsController } from '../federal_units.controller';

describe('FederalUnitsController', () => {
  let controller: FederalUnitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FederalUnitsController],
      providers: [FederalUnitsService],
    }).compile();

    controller = module.get<FederalUnitsController>(FederalUnitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
