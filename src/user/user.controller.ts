import {
  Controller,
  Get,
  Delete,
  Post,
  Param,
  Patch,
  Query,
  Body,
  UsePipes,
  Version,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto, MyDto, MyDtoSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoIdValidationPipe } from 'src/pipes/validator/mongoid.validator';
import { PaginationQueryDTO } from './dto/pagination.dto';

import { ZodValidationPipe } from 'nestjs-zod';
import { QueryUserListZodDTO } from './dto/query-user.zod.dto';
import { AccessTokenGuard } from 'src/guard/acccess-token.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ActiveUser } from 'src/decorator/active-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(AccessTokenGuard)
  @Version('1')
  @Post('create')
  create(@ActiveUser() user: any) {
    return user;
    // console.log(createUserDto);
    // return this.userService.create(createUserDto);
  }
  @Version('2')
  @UsePipes(new ZodValidationPipe(MyDtoSchema))
  @Post('create')
  createv2(@Body() createUserDto: MyDto) {
    return createUserDto;
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
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch('update/:id')
  update(
    @Param('id', MongoIdValidationPipe) userId: string,
    @Payload() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id', MongoIdValidationPipe) id: string) {
    return this.userService.remove(id);
  }
}
