export interface IStorageRepository {
    upload(file: Express.Multer.File): Promise<string>;
    delete(fileKey: string): Promise<void>;
}
