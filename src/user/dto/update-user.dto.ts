import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty,IsString,IsMongoId } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsMongoId()
  province: string;

  @IsNotEmpty()
  @IsString()
  province_name: string;

  @IsNotEmpty()
  @IsMongoId()
  city: string;

  @IsNotEmpty()
  @IsString()
  city_name: string;

  @IsNotEmpty()
  @IsMongoId()
  district: string;

  @IsNotEmpty()
  @IsString()
  district_name: string;

  @IsNotEmpty()
  @IsMongoId()
  sub_district: string;

  @IsNotEmpty()
  @IsString()
  sub_district_name: string;
}
