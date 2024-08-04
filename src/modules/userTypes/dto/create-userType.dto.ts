import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateUserTypeDto {
  @IsString()
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;
}
