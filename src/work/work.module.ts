import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { Work, WorkSchema } from './schemas/work.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Work.name, schema: WorkSchema }]),
  ],
  controllers: [WorkController],
  providers: [WorkService],
  exports: [WorkService], // 需要被其他模块使用的服务，必须要导出
})
export class WorkModule {}
