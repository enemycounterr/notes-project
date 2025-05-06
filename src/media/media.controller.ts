import { Body, Controller, Get, NotFoundException, Param, Post, Res, ServiceUnavailableException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { StorageFile } from 'src/storage/storage-file';
import { StorageService } from 'src/storage/storage.service';
import { Response } from "express";
import { ConfigService } from '@nestjs/config';
import multer from 'multer';
import * as multerGoogleStorage from 'multer-google-storage';
import { extname } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();
console.log("MEDIA", process.env.KEYFILENAME);

@Controller('media')
export class MediaController {
    constructor(
        private storageService: StorageService,
        private configService: ConfigService
    ) { }

    @Post()
    @UseInterceptors(
        FileInterceptor("file", {
            limits: {
                files: 1,
                fileSize: 1024 * 1024,
            },
        })
    )
    async uploadMedia(
        @UploadedFile() file: Express.Multer.File,
        @Body("mediaId") mediaId: string
    ) {
        // await this.storageService.save(
        //     "media/" + mediaId,
        //     file.mimetype,
        //     file.buffer,
        //     [{ mediaId: mediaId }]
        // );
        return await this.storageService.save(file);
    }


    //TODO: implement factory for env variables, USE FACTORY
    // @Post('upload-files')
    // @UseInterceptors(
    //     FilesInterceptor('files', null!, {
    //         storage: multerGoogleStorage.storageEngine({
    //             projectId: 'notes-project-457509',
    //             keyFileName: 'notes-project-457509-b2e427786867.json',
    //             bucket: 'notes-project-bucket',
    //             filename: (req, file, callback) => {
    //                 const name = file.originalname.split('.');
    //                 const fileExtName = extname(file.originalname);
    //                 const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    //                 callback(null, `${name}-${randomName}${fileExtName}`);
    //             }
    //         }),

    //     })
    // )
    // async uploadFiles() {

    // }



    @Get("/:mediaId")
    async downloadMedia(@Param("mediaId") mediaId: string, @Res() res: Response) {
        let storageFile: StorageFile;
        try {
            storageFile = await this.storageService.get("media/" + mediaId);
        } catch (e) {
            if (e.message.toString().includes("No such object")) {
                throw new NotFoundException("image not found");
            } else {
                throw new ServiceUnavailableException("internal error");
            }
        }
        res.setHeader("Content-Type", storageFile.contentType);
        res.setHeader("Cache-Control", `public, max-age=${60 * 24 * 60 * 60}`);
        res.end(storageFile.buffer);
    }
}
