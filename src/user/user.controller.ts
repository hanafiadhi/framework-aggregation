import { Controller,Get, Delete, Post,Param, Patch, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoIdValidationPipe } from 'src/pipes/validator/mongoid.validator';
import { PaginationQueryDTO } from './dto/pagination.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('list')
  findAll(@Query() query: PaginationQueryDTO) {
    return this.userService.findAll(query);
  }

  @Get('/:id')
  findOne(@Param('id' , MongoIdValidationPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch('update/:id')
  update(@Param('id', MongoIdValidationPipe) id: string, @Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id' , MongoIdValidationPipe) id: string) {
    return this.userService.remove(id);
  }
}
