import { Test, TestingModule } from '@nestjs/testing';
import { SaleDetailsController } from './sale-details.controller';
import { SaleDetailsService } from './sale-details.service';

describe('SaleDetailsController', () => {
  let controller: SaleDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleDetailsController],
      providers: [SaleDetailsService],
    }).compile();

    controller = module.get<SaleDetailsController>(SaleDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
