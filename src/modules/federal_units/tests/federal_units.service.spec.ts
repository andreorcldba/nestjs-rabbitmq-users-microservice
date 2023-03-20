import { Test, TestingModule } from '@nestjs/testing';
import { FederalUnitsService } from '../federal_units.service';

describe('FederalUnitsService', () => {
  let service: FederalUnitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FederalUnitsService],
    }).compile();

    service = module.get<FederalUnitsService>(FederalUnitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
