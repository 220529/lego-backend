import { Module } from '@nestjs/common';
import { AbilityService } from './casl-ability.factory';

@Module({
  providers: [AbilityService],
  exports: [AbilityService],
})
export class CaslModule {}
