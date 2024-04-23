import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository} from 'typeorm';
import { Report } from './entities/report.entity';
import { Sale } from '../sales/entities/sale.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/enum/role.enum';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(User)
    private userRepository: Repository<User>

  ){}

  async create(createReportDto: CreateReportDto, userId: number): Promise<Report> {
    const { title, periodStart, periodEnd } = createReportDto;

    const user = (await this.userRepository.findOne({where:{id:userId}}));
    const userType = user.role;
    if (!userType) {
        throw new NotFoundException(`User not found with ID ${userId}`);
    }

    if(userType != Role.RESTAURANT && userType != Role.STUDENT){
      throw new NotFoundException(`Invalid user type ${userType} dont have sales`);
    } 
   
    const sales = await this.saleRepository.find({
      where: {
          createdAt: Between(new Date(periodStart), new Date(periodEnd)), restaurant: { id: userId } 
      }
    });

    // Calculate totals
    const totalSales = sales.reduce((sum, sale) => sum + sale.totalValue, 0);
    const totalTransactions = sales.length;
    const report = this.reportRepository.create({
        title,
        periodStart: new Date(periodStart),
        periodEnd: new Date(periodEnd),
        totalSales,
        totalTransactions,
        user: user,
        sales
    });

    return this.reportRepository.save(report);
}

async findAll() {
  return this.reportRepository.find({
    relations: ['user', 'sales']
  });
}

async findOne(id: number) {
  const report = await this.reportRepository.findOne({
    where: { id },
    relations: ['user', 'sales']
  });
  if (!report) {
    throw new NotFoundException(`Report with ID ${id} not found.`);
  }
  return report;
}

async update(id: number, updateReportDto: UpdateReportDto) {
  const report = await this.reportRepository.preload({
    id,
    ...updateReportDto
  });
  if (!report) {
    throw new NotFoundException(`Report with ID ${id} not found.`);
  }
  return this.reportRepository.save(report);
}

async remove(id: number) {
  const result = await this.reportRepository.softDelete(id);
  if (result.affected === 0) {
    throw new NotFoundException(`Report with ID ${id} not found.`);
  }
}

}
