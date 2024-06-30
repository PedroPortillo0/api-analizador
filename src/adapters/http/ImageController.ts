import { Request, Response } from 'express';
import { ImageService } from '../../application/ImageService';

export class ImageController {
    constructor(private imageService: ImageService) {}

    public async uploadImage(req: Request, res: Response): Promise<Response> {
        const file = req.file;
        if (!file) {
            return res.status(400).send({ message: 'No file provided' });
        }
        const url = await this.imageService.uploadImage(file);
        return res.status(201).json({ url });
    }

    public async deleteImage(req: Request, res: Response): Promise<Response> {
        const { key } = req.params;
        await this.imageService.deleteImage(key);
        return res.status(204).send();
    }
}
