import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { UserType } from '../modules/userTypes/entities/userType.entity';
import { User } from '../modules/users/entities/user.entity';
import { CreateUserTypeDto } from 'src/modules/userTypes/dto/create-userType.dto';

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
          'A user with full access to the system, including the ability to view, create, modify, and delete content and manage other users. Administrators have the highest level of permissions and control over system settings and configurations',
      },
      {
        name: 'Viewer',
        description:
          'A user who has read-only access to the system. They can view content and data but do not have permission to make changes or modifications',
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

      if (i === 0) {
        user.username = 'John';
        user.lastname = 'Doe';
        user.cellphone = '1234567890';
        user.email = 'john.doe@example.com';
        user.password = '123';
        user.userType = userTypes[0];
      } else if (i === 1) {
        user.username = 'Jane';
        user.lastname = 'Doe';
        user.cellphone = '1234567890';
        user.email = 'jane.doe@example.com';
        user.password = '123';
        user.userType = userTypes[1];
      } else {
        user.username = faker.person.firstName();
        user.lastname = faker.person.lastName();
        user.cellphone = faker.phone.number();
        user.email = faker.internet.email();
        user.password = faker.internet.password();
        user.userType = userTypes[Math.floor(Math.random() * userTypes.length)];
      }

      users.push(user);
    }

    await this.userRepository.save(users);
  }
}
