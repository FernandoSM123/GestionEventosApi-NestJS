import { Module, forwardRef } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserTypesModule } from '../userTypes/userTypes.module';
import { AuthModule } from '../auth/auth.module';

import { ActiveTokensModule } from '../activeTokens/active-tokens.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => UserTypesModule),
    forwardRef(() => AuthModule),
    ActiveTokensModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
