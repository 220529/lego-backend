import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cat/cat.module';

@Module({
  imports: [
    CatsModule,
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          user: 'root',
          pass: 'root',
          dbName: 'lego',
          uri: 'mongodb://localhost:27017',
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
