import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveToken } from './entities/active-token.entity';

@Injectable()
export class ActiveTokensService {
  constructor(
    @InjectRepository(ActiveToken)
    private readonly activeTokenRepository: Repository<ActiveToken>,
  ) {}

  //CREAR UN TOKEN DE AUTENTICAION
  async addToken(userId: number, token: string): Promise<ActiveToken> {
    const activeToken = this.activeTokenRepository.create({ userId, token });
    return this.activeTokenRepository.save(activeToken);
  }

  //BUSCAR UN TOKEN DE AUTENTICAION
  async findToken(token: string): Promise<ActiveToken | undefined> {
    return this.activeTokenRepository.findOne({ where: { token } });
  }

  //ELIMINAR UN TOKEN DE AUTENTICAION
  async removeToken(token: string): Promise<void> {
    await this.activeTokenRepository.delete({ token });
  }
}
