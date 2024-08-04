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

  // Crear un nuevo TipoUsuario
  async create(createUserTypeDto: CreateUserTypeDto): Promise<UserType> {
    const userType = this.userTypeRepository.create(createUserTypeDto);
    return this.userTypeRepository.save(userType);
  }

  // Obtener todos los TiposUsuario
  async findAll(): Promise<UserType[]> {
    return this.userTypeRepository.find();
  }

  // Obtener un TipoUsuario por id
  async findOne(id: number): Promise<UserType> {
    return this.userTypeRepository.findOneBy({ id });
  }

  // Actualizar un TipoUsuario por id
  async update(
    id: number,
    updateUserTypeDto: UpdateUserTypeDto,
  ): Promise<UserType> {
    await this.userTypeRepository.update(id, updateUserTypeDto);
    return this.findOne(id);
  }

  // Eliminar un TipoUsuario por id
  async remove(id: number): Promise<void> {
    await this.userTypeRepository.delete(id);
  }
}
