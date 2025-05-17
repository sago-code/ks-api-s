import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const { firstName, lastName, age, email, password, phone, photo = null, rolId } = req.body;

    try {
        await userService.createUser(firstName, lastName, age, email, password, phone, photo, rolId);
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error });
    }
}