import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

interface AuthenticatedRequest extends Request {
    userId?: number;
    userRol?: string;
    user?: any;
}

const authService = new AuthService();

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    try {
        const result = await authService.login(email, password);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(401).json({ 
            message: 'Credenciales inválidas', 
            error: error?.message || 'Error desconocido' 
        });
    }
};

export const logout = async (req: Request, res: Response): Promise<Response> => {
    const authReq = req as AuthenticatedRequest;
    const token = authReq.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        await authService.logout(token);
        return res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error: any) {
        return res.status(500).json({ 
            message: 'Error al cerrar sesión', 
            error: error?.message || 'Error desconocido' 
        });
    }
};

export const getProfile = async (req: Request, res: Response): Promise<Response> => {
    const authReq = req as AuthenticatedRequest;
    return res.status(200).json({ 
        user: authReq.user,
        message: 'Perfil obtenido correctamente' 
    });
};