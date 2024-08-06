import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //RUTA TEST
  @Get('test')
  test(@Query('num', ParseIntPipe) num: number) {
    return `Number is ${num}`;
  }

  //OBTENER USUARIOS CON PAGINACION
  @Get('paginate')
  async paginate(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('filter') filter?: string,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    limit = limit > 100 ? 100 : limit; // Limitar el tamaño máximo de la página
    return this.usersService.paginate(
      page,
      limit,
      filter,
      sortField,
      sortOrder,
    );
  }

  // CREAR UN NUEVO USUARIO
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  // OBTENER TODOS LOS USUARIOS
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  // OBTENER UN USUARIO POR ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  // ACTUALIZAR UN USUARIO POR ID
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  // ELIMINAR UN USUARIO POR ID
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.usersService.remove(id);
  }
}
