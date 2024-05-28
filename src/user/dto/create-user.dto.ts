import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
class User {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  age: number;
}

// export class CreateUserDto {
//   @IsNotEmpty()
//   @ValidateNested({ each: true })
//   @Type(() => User)
//   users: User[];

//   @IsNotEmpty()
//   @IsMongoId()
//   province: string;

//   @IsNotEmpty()
//   @IsString()
//   province_name: string;

//   @IsNotEmpty()
//   @IsMongoId()
//   city: string;

//   @IsNotEmpty()
//   @IsString()
//   city_name: string;

//   @IsNotEmpty()
//   @IsMongoId()
//   district: string;

//   @IsNotEmpty()
//   @IsString()
//   district_name: string;

//   @IsNotEmpty()
//   @IsMongoId()
//   sub_district: string;

//   @IsNotEmpty()
//   @IsString()
//   sub_district_name: string;
// }

export class CreateUserDto {
  @ApiProperty({
    description: 'silahkan masukan username yang akan di gunakan untuk login',
    example: '081234567890123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(13)
  username: string;

  @ApiProperty({
    required: true,
    description: 'Silahkan masukan password nda',
    example: 'gundamRx70',
    minimum: 8,
  })
  @IsNotEmpty()
  @MinLength(8)
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
