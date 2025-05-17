import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export interface AuthenticatedRequest extends Request {
    userId?: number;
    userRol?: string;
    user?: any;
}

// Cambia la definición de la función para que sea compatible con Express
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token no proporcionado o formato inválido' });
        return;
    }
    
    const token = authHeader.split(' ')[1];
    
    const authService = new AuthService();
    authService.verifyToken(token)
        .then(decoded => {
            // Añadir información del usuario a la solicitud
            const authReq = req as AuthenticatedRequest;
            authReq.userId = decoded.userId;
            authReq.userRol = decoded.rolName;
            authReq.user = decoded;
            
            next();
        })
        .catch(error => {
            res.status(401).json({ message: 'Token inválido o sesión cerrada' });
        });
};