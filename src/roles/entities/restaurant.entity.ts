import { Entity, Column, OneToMany, JoinColumn, ChildEntity } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { New } from 'src/news/entities/new.entity';
import { Product } from 'src/products/entities/product.entity';
import { Report } from 'src/reports/entities/report.entity';

@ChildEntity('restaurant')
export class Restaurant extends User{
    @Column()
    name: string;

    @Column()
    nit:number;

    @Column()
    manager: string;

    @Column()
    phone:string;

    @OneToMany(() => Sale, sales=>sales.restaurant)
    sales: Sale[];

    @OneToMany(() => New, news=>news.restaurant)
    news: New[];

    @OneToMany(() => Product, products=>products.restaurant)
    products: Product[];

    @OneToMany(() => Report, report => report.restaurant)
    reports: Report[];

    constructor() {
        super();
        this.role = 'restaurant';
    }
}
