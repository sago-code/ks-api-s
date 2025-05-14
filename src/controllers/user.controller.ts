import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

interface AuthenticatedRequest extends Request {
    userId?: number;
}

const userService = new UserService();

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { firstName, lastName, age, email, password, phone, photo = null } = req.body;

    try {
        await userService.createUser(firstName, lastName, age, email, password, phone, photo);
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
}