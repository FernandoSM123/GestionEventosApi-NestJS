/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';
import { UserTypesService } from './userTypes.service';
import { UserTypesController } from './userTypes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from './entities/userType.entity';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserType]),
    forwardRef(() => UsersModule),
  ],
  controllers: [UserTypesController],
  providers: [UserTypesService],
  exports: [TypeOrmModule],
})
export class UserTypesModule {}
