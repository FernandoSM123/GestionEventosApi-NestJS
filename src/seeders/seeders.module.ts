// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { SeedersService } from './seeders.service';
// import { UserType } from '../modules/userTypes/entities/userType.entity';
// import { User } from '../modules/users/entities/user.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([UserType, User])],
//   controllers: [],
//   providers: [SeedersService],
// })
// export class SeedersModule {}

// src/seeders/seed.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedersService } from './seeders.service';
import { UserType } from '../modules/userTypes/entities/userType.entity';
import { User } from '../modules/users/entities/user.entity';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserType, User],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([UserType, User]),
  ],
  providers: [SeedersService],
})
export class SeedersModule {}
