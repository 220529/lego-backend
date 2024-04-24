import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CaslGuard } from '@/guards/casl.guard';
import { UserModule } from '@/user/user.module';
import { WorkModule } from '@/work/work.module';
import { AbilityService } from './casl-ability.factory';

@Module({
  imports: [UserModule, WorkModule],
  providers: [
    AbilityService,
    {
      provide: APP_GUARD,
      useClass: CaslGuard,
    },
  ],
})
export class CaslModule {}
