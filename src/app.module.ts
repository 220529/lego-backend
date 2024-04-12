import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          user: configService.get('ROOT_NAME'),
          pass: configService.get('ROOT_PASSWORD'),
          dbName: configService.get('DATABASE'),
          uri: `mongodb://${configService.get('HOST')}:${configService.get('PORT')}`,
        };
      },
    }),
  ],
})
export class AppModule {}
