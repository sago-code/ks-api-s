import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm';
import { AppDataSource } from '../db/db';
import { User } from './User.entity';

@Entity()
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.rol)
    users: User[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    static async createInitialRoles(): Promise<void> {
        const roleRepository = AppDataSource.getRepository(Rol);
        
        const count = await roleRepository.count();
        
        if (count === 0) {
            const adminRole = new Rol();
            adminRole.name = 'admin';
            
            const clientRole = new Rol();
            clientRole.name = 'cliente';
            
            await roleRepository.save([adminRole, clientRole]);
            
            console.log('Roles iniciales creados: admin, cliente');
        }
    }
}