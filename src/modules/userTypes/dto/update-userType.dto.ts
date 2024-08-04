import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTypeDto } from './create-userType.dto';

export class UpdateUserTypeDto extends PartialType(CreateUserTypeDto) {}
