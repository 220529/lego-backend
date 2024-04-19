import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { Work, WorkSchema } from './schemas/work.schema';
import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    CaslModule,
    MongooseModule.forFeature([{ name: Work.name, schema: WorkSchema }]),
  ],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
