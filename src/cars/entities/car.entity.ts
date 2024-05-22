import { Column,Entity,PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Car {
    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column({name:'car_model'}) 
    carModel: string;

    @Column({name:'model'}) 
    model: string;

    @Column()
    age: number;

    @Column()
    color: string;

    @Column()
    price: number;

    constructor(item: Partial<Car>) {
        Object.assign(this, item);
    }
}
