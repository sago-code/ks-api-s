import { AppDataSource } from '../db/db';
import bcrypt from 'bcryptjs';

export class UserService {
    async createUser(firstName: string, lastName: string, age: number, email: string, password: string, phone: number): Promise<void> {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            await queryRunner.manager.query(
                'CALL create_user(?, ?, ?, ?, ?, ?)',
                [firstName, lastName, age, email, hashedPassword, phone],
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