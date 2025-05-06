import { Injectable } from '@nestjs/common';
// import StorageConfig from './storage-config';
import { Bucket, DownloadResponse, Storage } from '@google-cloud/storage';
import { StorageFile } from './storage-file';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';

@Injectable()
export class StorageService {
    private storage: Storage;
    private bucketName: string;
    private bucket: Bucket;


    constructor(
        private readonly configService: ConfigService
    ) {
        console.log("STORAGE TEST", this.configService.get<string>('GOOGLE_STORAGE_CLIENT_EMAIL'))
        // this.storage = new Storage({
        //     projectId: this.configService.get('GOOGLE_STORAGE_PROJECT_ID'),
        //     credentials: {
        //         client_email: this.configService.get<string>('GOOGLE_STORAGE_CLIENT_EMAIL'),
        //         private_key: this.configService.get<string>('GOOGLE_STORAGE_PRIVATE_KEY'),
        //     },
        // });

        this.storage = new Storage({
            projectId: this.configService.get('GOOGLE_STORAGE_PROJECT_ID'),
            keyFilename: this.configService.get('KEYFILENAME')
        })

        this.bucketName = this.configService.get<string>('GOOGLE_STORAGE_BUCKET')!;
        this.bucket = this.storage.bucket(this.bucketName);
    }

    async save(
        // path: string,
        // contentType: string,
        // media: Buffer,
        // metadata: { [key: string]: string }[]
        file: Express.Multer.File
    ): Promise<string> {
        // const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
        // console.log("TEST");
        // console.log(this.bucketName);
        // const file = this.storage.bucket(this.bucketName).file(path);
        // const stream = file.createWriteStream();
        // stream.on("finish", async () => {
        //     return await file.setMetadata({
        //         metadata: object,
        //     });
        // });
        // return stream.end(media);


        
        const ext = extname(file.originalname);
        const filename = `${new Date().toISOString()}${ext}`;
        const blob = this.bucket.file(filename);

        const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype,
        });

        return new Promise<string>((resolve, reject) => {
            blobStream.on('error', (err) => reject(err));

            blobStream.on('finish', async () => {
                // Make the file public
                // await blob.makePublic();

                // // Public URL
                const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${filename}`;
                resolve(publicUrl);
                // resolve('success');
            });

            blobStream.end(file.buffer);
        });

        // const bucket = this.storage.bucket(this.bucketName);
        // const res = await bucket.upload('package.json', {
        //     destination: 'test.json'
        // });

        // return res;
    }

    async delete(path: string) {
        await this.storage
            .bucket(this.bucketName)
            .file(path)
            .delete({ ignoreNotFound: false });
    }

    async get(path: string): Promise<StorageFile> {
        const fileResponse: DownloadResponse = await this.storage
            .bucket(this.bucketName)
            .file(path)
            .download();
        const [buffer] = fileResponse;
        const storageFile = new StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map<string, string>();
        return storageFile;
    }

    async getWithMetaData(path: string): Promise<StorageFile> {
        const [metadata] = await this.storage
            .bucket(this.bucketName)
            .file(path)
            .getMetadata();
        const fileResponse: DownloadResponse = await this.storage
            .bucket(this.bucketName)
            .file(path)
            .download();
        const [buffer] = fileResponse;

        const storageFile = new StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map<string, string>();
        // storageFile.metadata = new Map<string, string>(
        //     Object.entries(metadata)
        // );
        storageFile.contentType = storageFile.metadata.get("contentType")!;
        return storageFile;
    }
}
