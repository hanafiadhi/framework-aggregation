import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'silahkan masukan username yang akan di gunakan untuk login',
    example: '081234567890123',
    uniqueItems: true,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  username: string;

  @ApiProperty({
    description: 'orang yang menyewa',
    example: 'PDPxxxx',
    uniqueItems: true,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  tenant_id: string;

  @ApiProperty({
    required: false,
    description: 'Silahkan masukan password nda',
    example: 'gundamRx70',
    minimum: 8,
  })
  @IsOptional()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  password: string;

  @ApiProperty({
    isArray: true,
    required: false,
    type: String,
    example: ['ada', 'tiada', 'ada'],
  })
  @IsNotEmpty({ each: true })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  role: string[];

  @ApiProperty({
    isArray: true,
    required: false,
    type: String,
    example: ['ada', 'tiada', 'ada'],
  })
  @IsNotEmpty({ each: true })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  applications: string[];
}
