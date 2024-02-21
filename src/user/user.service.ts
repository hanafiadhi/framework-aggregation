import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom } from 'rxjs';
import { USER_QUEUE } from 'src/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationQueryDTO } from './dto/pagination.dto';
import { CreateUserDataZodDTO } from './dto/create-user.zod.dto';
import { QueryUserListZodDTO } from './dto/query-user.zod.dto';

@Injectable()
export class UserService {
  constructor(@Inject(USER_QUEUE) private readonly clientUser: ClientProxy) {}

  async create(createUserDto: CreateUserDataZodDTO) {
    const user = await firstValueFrom(
      this.clientUser.send('create-user', createUserDto),
    );

    return user;
  }

  async findAll(payload: QueryUserListZodDTO) {
    const getListUser = await firstValueFrom(
      this.clientUser.send('get-user-list', payload),
    );
    return getListUser;
  }

  async findOne(userId: string) {
    const getUser = await firstValueFrom(
      this.clientUser.send('get-user', userId),
    );
    return getUser;
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    const updateUser = await firstValueFrom(
      this.clientUser.send('update-user', { data: updateUserDto, userId }),
    );
    return updateUser;
  }

  async remove(userId: string) {
    const deleteUser = await firstValueFrom(
      this.clientUser.send('delete-user', userId),
    );
    return deleteUser;
  }
}
