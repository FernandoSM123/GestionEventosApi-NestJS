import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActiveToken } from './entities/active-token.entity';
import { ActiveTokensService } from './active-tokens.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActiveToken])],
  controllers: [],
  providers: [ActiveTokensService],
  exports: [TypeOrmModule, ActiveTokensService],
})
export class ActiveTokensModule {}
