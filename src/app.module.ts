import { ActiveTokensModule } from './modules/activeTokens/active-tokens.module';
import { AuthModule } from './modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';

import { UserTypesModule } from './modules/userTypes/userTypes.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    //modulos
    UsersModule,
    UserTypesModule,
    AuthModule,
    ActiveTokensModule,

    // Carga las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
