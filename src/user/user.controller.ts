import {
  Controller,
  Get,
  Delete,
  Post,
  Param,
  Patch,
  Query,
  Body,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoIdValidationPipe } from 'src/pipes/validator/mongoid.validator';
import { PaginationQueryDTO } from './dto/pagination.dto';
import { JoiPipe } from 'nestjs-joi';
import { GetUserByRegionValidator } from 'src/validators/get-user-by-region.validation';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('list')
  findAll(@Query() query: PaginationQueryDTO) {
    return this.userService.findAll(query);
  }

  @Get('region')
  async findByRegion(
    @Body(new JoiPipe(GetUserByRegionValidator))
    payload: GetUserByRegionValidator,
  ) {
    return this.findByRegion(payload);
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
