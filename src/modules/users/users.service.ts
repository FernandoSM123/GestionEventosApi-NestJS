/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserType } from '../userTypes/entities/userType.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
  ) {}

  //BUSCA USUARIO POR CORREO
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['userType'],
    });
  }

  // CREAR UN NUEVO USUARIO
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Encuentra el UserType basado en el ID proporcionado
    const userType = await this.userTypeRepository.findOne({
      where: { id: createUserDto.userTypeId },
    });

    if (!userType) {
      throw new NotFoundException(
        `UserType with ID ${createUserDto.userTypeId} not found`,
      );
    }

    // Crea el usuario y asigna la relación con UserType
    const newUser = this.userRepository.create({
      ...createUserDto,
      userType: userType,
    });

    return await this.userRepository.save(newUser);
  }

  // OBTENER TODOS LOS USUARIOS
  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['userType'] });
  }

  // OBTENER A UN USUARIO POR ID
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['userType'],
    });
  }

  // ACTUALIZAR UN USUARIO POR ID
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.userTypeId) {
      const userType = await this.userTypeRepository.findOne({
        where: { id: updateUserDto.userTypeId },
      });

      if (!userType) {
        throw new NotFoundException(
          `UserType with ID ${updateUserDto.userTypeId} not found`,
        );
      }

      user.userType = userType;
    }

    // Actualiza otros campos del usuario
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  // ELIMINAR A UN USUARIO POR ID
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  //OBTENER USUARIOS CON PAGINACION
  async paginate(
    page: number,
    limit: number,
    filter?: string,
    sortField?: string,
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ): Promise<{ data: User[]; total: number }> {
    const options: FindManyOptions<User> = {
      take: limit,
      skip: (page - 1) * limit,
    };

    // Aplicar filtro si se proporciona
    if (filter) {
      options.where = [
        { username: Like(`%${filter}%`) },
        { lastname: Like(`%${filter}%`) },
        { email: Like(`%${filter}%`) },
      ];
    }

    // Aplicar ordenamiento si se proporciona
    if (sortField) {
      options.order = {
        [sortField]: sortOrder,
      };
    }

    const [result, total] = await this.userRepository.findAndCount(options);

    return {
      data: result,
      total,
    };
  }
}
