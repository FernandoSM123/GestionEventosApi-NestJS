import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ActiveTokensService } from '../activeTokens/active-tokens.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly activeTokensService: ActiveTokensService,
  ) {}

  //VALIDAR USUARIO CON BASE AL EMAIL Y CONTRASENNA
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user; //retorna el usuario si la contrasena
      return result;
    }
    return null;
  }

  //LOGIN
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload); //generar token
    await this.activeTokensService.addToken(user.id, token); //annadir token a la DB
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  //LOGOUT
  async logout(token: string) {
    await this.activeTokensService.removeToken(token); //eliminar token de la DB
    return { message: 'Logged out successfully' };
  }

  // BUSCA USUARIO POR ID EN LA DB
  async findUserById(id: number) {
    return this.usersService.findOne(id);
  }
}
