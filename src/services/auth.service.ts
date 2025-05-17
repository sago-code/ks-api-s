import { AppDataSource } from '../db/db';
import { User } from '../entities/User.entity';
import { UserAccessToken } from '../entities/UserAccessToken.entity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'kabod-style-secret-key';
const JWT_EXPIRES_IN = '24h';

export class AuthService {
    async login(email: string, password: string): Promise<{ user: Partial<User>, token: string }> {
        const userRepository = AppDataSource.getRepository(User);
        const tokenRepository = AppDataSource.getRepository(UserAccessToken);
        
        const user = await userRepository.findOne({ 
            where: { email },
            relations: ['rol']
        });
        
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }
        
        const token = jwt.sign(
            { 
                userId: user.id,
                email: user.email,
                rolId: user.rolId,
                rolName: user.rol.name
            }, 
            JWT_SECRET, 
            { expiresIn: JWT_EXPIRES_IN }
        );
        
        const userToken = new UserAccessToken();
        userToken.token = token;
        userToken.user = user;
        userToken.tokenActive = true;
        
        await tokenRepository.save(userToken);
        
        const { password: _, ...userWithoutPassword } = user;
        
        return {
            user: userWithoutPassword,
            token
        };
    }
    
    async logout(token: string): Promise<void> {
        const tokenRepository = AppDataSource.getRepository(UserAccessToken);
        
        const userToken = await tokenRepository.findOne({ 
            where: { token, tokenActive: true } 
        });
        
        if (!userToken) {
            throw new Error('Token inválido o sesión ya cerrada');
        }
        
        userToken.tokenActive = false;
        await tokenRepository.save(userToken);
    }

    async verifyToken(token: string): Promise<any> {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            
            const tokenRepository = AppDataSource.getRepository(UserAccessToken);
            const userToken = await tokenRepository.findOne({
                where: { token, tokenActive: true }
            });
            
            if (!userToken) {
                throw new Error('Token revocado');
            }
            
            return decoded;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }
}