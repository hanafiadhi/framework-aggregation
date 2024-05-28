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
import { Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoIdValidationPipe } from 'src/pipes/validator/mongoid.validator';
import { PaginationQueryDTO } from './dto/pagination.dto';

import { AccessTokenGuard } from 'src/guard/acccess-token.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveUser } from 'src/decorator/active-user.decorator';

@ApiBearerAuth('jwt')
@UseGuards(AccessTokenGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  create(@ActiveUser() user: any) {
    return user;
    // console.log(createUserDto);
    // return this.userService.create(createUserDto);
  }
  @Version('1')
  @Post('create')
  createv2(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiExcludeEndpoint()
  @Get('list')
  findAll(@ActiveUser() user: any) {
    return user;
    // console.log(query);
    // return this.userService.findAll(query);
  }

  @ApiExcludeEndpoint()
  @Get('/:id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.userService.findOne(id);
  }

  @ApiExcludeEndpoint()
  @Patch('update/:id')
  update(
    @Param('id', MongoIdValidationPipe) userId: string,
    @Payload() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @ApiExcludeEndpoint()
  @Delete('delete/:id')
  remove(@Param('id', MongoIdValidationPipe) id: string) {
    return this.userService.remove(id);
  }
}
