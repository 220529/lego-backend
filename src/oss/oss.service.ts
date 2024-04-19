import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as OSS from 'ali-oss';

@Injectable()
export class OssService {
  private readonly ossClient: OSS;

  constructor(private configService: ConfigService) {
    // 从配置文件中读取访问密钥和其他配置
    const accessKeyId = this.configService.get<string>('ACCESS_KEY_ID');
    const accessKeySecret = this.configService.get<string>('ACCESS_KEY_SECRET');
    const bucket = this.configService.get<string>('OSS_BUCKET');
    const region = this.configService.get<string>('OSS_REGION');

    // 初始化OSS客户端
    this.ossClient = new OSS({
      accessKeyId,
      accessKeySecret,
      bucket,
      region,
    });
  }

  async uploadFile(fileName: string, fileBuffer: Buffer): Promise<string> {
    // 上传文件到OSS
    const result = await this.ossClient.put(fileName, fileBuffer);
    // 返回文件的URL
    return result.url;
  }
}
