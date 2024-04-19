import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { OssService } from './oss.service';

@ApiTags('Work')
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    const { originalname, buffer, mimetype } = file;
    const fileName = `${Date.now()}-${originalname}`;
    const fileUrl = await this.ossService.uploadFile(
      fileName,
      buffer,
      mimetype,
    );
    return { url: fileUrl, fileName };
  }
}
