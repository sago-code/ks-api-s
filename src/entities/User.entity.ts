import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from './Rol.entity';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column({unique: true, type: 'bigint'})
    phone: number;

    @Column({nullable: true})
    photo: string;
    
    @Column()
    rolId: number;
    
    @ManyToOne(() => Rol)
    @JoinColumn({ name: 'rolId' })
    rol: Rol;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}