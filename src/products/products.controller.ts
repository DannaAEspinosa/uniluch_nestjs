import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Role } from 'src/roles/enum/role.enum';

@Auth(Role.RESTAURANT)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('restaurant/:userId') //Se cambiará cuando haya autorización para obtener el usuario logueado
  create(@Param('userId') userId:number, @Body() createProductDto: CreateProductDto) {
    return this.productsService.create(+userId, createProductDto);
  }
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }

  @Get('restaurant/:restaurantId')
  findByRestaurant(@Param('restaurantId') restaurantId: number) {
    return this.productsService.findByRestaurant(restaurantId);
  }
}
