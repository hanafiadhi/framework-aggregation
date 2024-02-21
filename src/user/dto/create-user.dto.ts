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
  ValidateNested,
} from 'class-validator';
class User {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  age: number;
}

export class CreateUserDto {
  @ApiProperty({ isArray: true, type: User })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => User)
  users: User[];

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  province: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  province_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  district: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  district_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  sub_district: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sub_district_name: string;
}
