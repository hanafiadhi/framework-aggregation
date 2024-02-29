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
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  age: number;
}

export class CreateUserDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => User)
  users: User[];

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

import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
const hobbySchema = z
  .object({
    id: z.string(),
    name: z.string().min(2),
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: 'Hobby object must not be empty',
  });

// Definisikan skema untuk DTO (Data Transfer Object)
const MyDtoSchema = z.object({
  username: z.string().min(2).max(100),
  hobby: z.array(hobbySchema).min(1),
});

// Definisikan tipe untuk DTO
type MyDto = z.infer<typeof MyDtoSchema>;

export { MyDtoSchema, MyDto };
export class CreateUserDataZodDTO extends createZodDto(MyDtoSchema) {
  username: string;
  hobby: any;
}
