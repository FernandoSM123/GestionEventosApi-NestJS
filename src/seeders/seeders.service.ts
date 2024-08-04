import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { UserType } from '../modules/userTypes/entities/userType.entity';
import { User } from '../modules/users/entities/user.entity';

@Injectable()
export class SeedersService {
  constructor(
    @InjectRepository(UserType)
    private readonly userTypeRepository: Repository<UserType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async seed() {
    await this.createUserTypes();
    await this.createUsers();
  }

  //CREAR TIPOS DE USUARIO
  private async createUserTypes() {
    const userTypes = [
      {
        name: 'Administrator',
        description:
          'A user who has read-only access to the system. They can view content and data but do not have permission to make changes or modifications',
      },
      {
        name: 'Viewer',
        description:
          'A user with full access to the system, including the ability to view, create, modify, and delete content and manage other users. Administrators have the highest level of permissions and control over system settings and configurations',
      },
    ];

    await this.userTypeRepository.save(userTypes);
  }

  //CREAR USUARIOS
  private async createUsers() {
    const userTypes = await this.userTypeRepository.find();

    const users = [];

    for (let i = 0; i < 50; i++) {
      const user = new User();
      user.username = faker.person.firstName();
      user.lastname = faker.person.lastName();
      user.cellphone = faker.phone.number();
      user.email = faker.internet.email();
      user.password = faker.internet.password();
      user.userTypeId = userTypes[Math.floor(Math.random() * userTypes.length)];

      users.push(user);
    }

    await this.userRepository.save(users);
  }
}
