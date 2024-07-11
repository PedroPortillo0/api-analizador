import { Request, Response } from 'express';
import { UserService } from '../../application/userService';
import { User } from '../../domain/user';

export class UserController {
    constructor(private userService: UserService) {}

    public async createUser(req: Request, res: Response): Promise<Response> {
        const user: User = req.body;
        const createdUser = await this.userService.createUser(user);
        return res.status(201).json(createdUser);
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const user = await this.userService.getUser(id);
        return res.status(200).json(user);
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const user: User = req.body;
        const updatedUser = await this.userService.updateUser(id, user);
        return res.status(200).json(updatedUser);
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        await this.userService.deleteUser(id);
        return res.status(204).send();
    }

    // Nuevo método para actualizar la contraseña
    public async updatePassword(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const { password } = req.body;
        const updatedUser = await this.userService.updatePassword(id, password);
        return res.status(200).json(updatedUser);
    }
}
