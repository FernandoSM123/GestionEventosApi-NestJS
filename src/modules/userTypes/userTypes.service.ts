/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './entities/userType.entity';
import { CreateUserTypeDto } from './dto/create-userType.dto';
import { UpdateUserTypeDto } from './dto/update-userType.dto';

@Injectable()
export class UserTypesService {
  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
  ) {}

  // CREAR UN NUEVO TIPO DE USUARIO
  async create(createUserTypeDto: CreateUserTypeDto): Promise<UserType> {
    const userType = this.userTypeRepository.create(createUserTypeDto);
    return this.userTypeRepository.save(userType);
  }

  // OBTENER TODOS LOS TIPOS DE USUARIO
  async findAll(): Promise<UserType[]> {
    return this.userTypeRepository.find();
  }

  // OBTENER UN TIPO DE USUARIO POR ID
  async findOne(id: number): Promise<UserType> {
    return this.userTypeRepository.findOneBy({ id });
  }

  // ACTUALIZAR UN TIPO DE USUARIO POR ID
  async update(
    id: number,
    updateUserTypeDto: UpdateUserTypeDto,
  ): Promise<UserType> {
    await this.userTypeRepository.update(id, updateUserTypeDto);
    return this.findOne(id);
  }

  // ELIMINAR UN TIPO DE USUARIO POR ID
  async remove(id: number): Promise<void> {
    await this.userTypeRepository.delete(id);
  }
}
