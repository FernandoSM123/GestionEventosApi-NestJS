import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import * as passport from 'passport';
import { User } from '../users/entities/user.entity';
import { ActiveTokensModule } from '../activeTokens/active-tokens.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    ActiveTokensModule,
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret_key', // Usa una clave secreta más segura en un entorno real
      signOptions: { expiresIn: '60m' }, // Configura el tiempo de expiración del token
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalAuthGuard,
    LocalStrategy,
    JwtAuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard, JwtModule],
})
export class AuthModule {
  constructor(private readonly authService: AuthService) {
    this.setupSerialization();
  }

  private setupSerialization() {
    passport.serializeUser((user: User, done) => {
      done(null, user.id); // Aquí guardas el ID del usuario en la sesión
    });

    passport.deserializeUser(async (id: number, done) => {
      const user = await this.authService.findUserById(id); // Aquí recuperas al usuario desde la base de datos por su ID
      done(null, user);
    });
  }
}
