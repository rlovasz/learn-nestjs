import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from './editFileName';
import { imageFileFilter } from './imageFileFilter';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: editFileName,
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalName: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/files',
        filename: editFileName,
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalName: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('multiple-images')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './uploads/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    const response: any[] = [];
    files.forEach((file) => {
      const fileReponse = {
        originalName: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':subdir/:file')
  seeUploadedFile(
    @Param('subdir') subdir: string,
    @Param('file') file: string,
    @Res() res: Response,
  ) {
    return res.sendFile(`/${subdir}/${file}`, { root: './uploads' });
  }
}
