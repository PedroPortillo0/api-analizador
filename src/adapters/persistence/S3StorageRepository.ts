import AWS from 'aws-sdk';
import { IStorageRepository } from '../../domain/IStorageRepository';

export class S3StorageRepository implements IStorageRepository {
    private s3: AWS.S3;

    constructor() {
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;  
        const sessionToken = process.env.AWS_SESSION_TOKEN; 
        const region = process.env.AWS_REGION;

        if (!accessKeyId || !secretAccessKey || !region) {
            throw new Error('AWS credentials or region are not defined in .env');
        }

        this.s3 = new AWS.S3({
            accessKeyId,
            secretAccessKey,
            sessionToken: sessionToken || undefined,
            region,
        });
    }

    async upload(file: Express.Multer.File): Promise<string> {
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        
        if (!bucketName) {
            throw new Error('AWS S3 bucket name is not defined in .env');
        }

        const params = {
            Bucket: bucketName,
            Key: `${Date.now()}-${file.originalname}`,
            Body: file.buffer,
        };

        const result = await this.s3.upload(params).promise();
        return result.Location;
    }

    async delete(fileKey: string): Promise<void> {
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        
        if (!bucketName) {
            throw new Error('AWS S3 bucket name is not defined in .env');
        }

        const params = {
            Bucket: bucketName,
            Key: fileKey,
        };

        await this.s3.deleteObject(params).promise();
    }
}
