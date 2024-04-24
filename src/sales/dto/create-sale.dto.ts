import { IsNotEmpty, IsNumber, IsPositive, ValidateNested } from 'class-validator';
import { CreateSaleDetailDto } from '../../sale-details/dto/create-sale-detail.dto';
import { Type } from 'class-transformer';

export class CreateSaleDto {

    @IsNotEmpty()
    @IsNumber()
    restaurantId: number;
    
    @IsNotEmpty()
    @IsNumber()
    studentId: number;

    //saleDetails: CreateSaleDetailDto[];
    @ValidateNested({ each: true })
    @Type(() => CreateSaleDetailDto)
    saleDetails: CreateSaleDetailDto[];
}
