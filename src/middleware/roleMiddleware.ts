import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';

export const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authReq = req as AuthenticatedRequest;
        
        if (!authReq.userRol) {
            res.status(403).json({ message: 'Acceso denegado: Usuario no autenticado' });
            return;
        }
        
        if (!roles.includes(authReq.userRol)) {
            res.status(403).json({ message: 'Acceso denegado: No tienes permisos suficientes' });
            return;
        }
        
        next();
    };
};