import { AppDataSource } from '../db/db';
import bcrypt from 'bcryptjs';

export class UserService {
    async createUser(
        firstName: string, 
        lastName: string, 
        age: number, 
        email: string, 
        password: string, 
        phone: number, 
        photo: string | null,
        rolId?: number
    ): Promise<void> {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const userRolId = rolId !== undefined ? rolId : 2;

            await queryRunner.manager.query(
                'CALL create_user($1, $2, $3, $4, $5, $6, $7, $8)',
                [firstName, lastName, age, email, hashedPassword, phone, photo, userRolId],
            );
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}