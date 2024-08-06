import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ActiveTokensService } from '../../activeTokens/active-tokens.service';
import { Request } from 'express';

/*
Guard para proteger 
cualquier ruta que requiera autenticación.
*/

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly activeTokensService: ActiveTokensService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    const isActive = await this.activeTokensService.findToken(token);
    if (!isActive) {
      return false;
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch (e) {
      return false;
    }
  }
}
