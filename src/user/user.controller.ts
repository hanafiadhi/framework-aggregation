import { Controller,Get, Delete, Post,Param, Patch, Query, Body, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoIdValidationPipe } from 'src/pipes/validator/mongoid.validator';
import { PaginationQueryDTO } from './dto/pagination.dto';
import { CreateUserDataZodDTO } from './dto/create-user.zod.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { QueryUserListZodDTO } from './dto/query-user.zod.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @UsePipes(ZodValidationPipe)
  @Post('create')
  create(@Body() createUserDto: CreateUserDataZodDTO) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @UsePipes(ZodValidationPipe)
  @Get('list')
  findAll(@Query() query: QueryUserListZodDTO) {
    console.log(query);
    return this.userService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id' , MongoIdValidationPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id', MongoIdValidationPipe) userId: string, @Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id' , MongoIdValidationPipe) id: string) {
    return this.userService.remove(id);
  }
}
