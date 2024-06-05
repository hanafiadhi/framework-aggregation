import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    description: 'silahkan masukan username yang akan di gunakan untuk login',
    example: '081234567890123',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  username: string;

  @ApiProperty({
    description: 'orang yang menyewa',
    example: 'PDPxxxx',
    uniqueItems: true,
  })
  @IsNotEmpty()
  @IsString()
  tenant_id: string;

  @ApiProperty({
    required: true,
    description: 'Silahkan masukan password nda',
    example: 'gundamRx70',
    minimum: 8,
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  password: string;

  @ApiProperty({
    isArray: true,
    required: true,
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
    required: true,
    type: String,
    example: ['ada', 'tiada', 'ada'],
  })
  @IsNotEmpty({ each: true })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  applications: string[];
}
