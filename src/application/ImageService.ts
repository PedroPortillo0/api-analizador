import { IStorageRepository } from '../domain/IStorageRepository';
import { Express } from 'express';

export class ImageService {
    constructor(private storageRepository: IStorageRepository) {}

    async uploadImage(file: Express.Multer.File): Promise<string> {
        return this.storageRepository.upload(file);
    }

    async deleteImage(fileKey: string): Promise<void> {
        return this.storageRepository.delete(fileKey);
    }
}
