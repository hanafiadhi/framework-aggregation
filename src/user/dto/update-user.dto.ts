import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  age: number;

  @IsOptional()
  @IsMongoId()
  province: string;

  @IsOptional()
  @IsString()
  province_name: string;

  @IsOptional()
  @IsMongoId()
  city: string;

  @IsOptional()
  @IsString()
  city_name: string;

  @IsOptional()
  @IsMongoId()
  district: string;

  @IsOptional()
  @IsString()
  district_name: string;

  @IsOptional()
  @IsMongoId()
  sub_district: string;

  @IsOptional()
  @IsString()
  sub_district_name: string;
}
