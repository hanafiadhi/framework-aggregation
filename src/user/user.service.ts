import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom } from 'rxjs';
import { USER } from 'src/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationQueryDTO } from './dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(@Inject(USER) private readonly clientUser: ClientProxy) {}

  async create(createUserDto: CreateUserDto) {
    const user = await firstValueFrom(
      this.clientUser.send('create-user', createUserDto),
    );

    return user;
  }

    async findAll(payload: PaginationQueryDTO) {
     const getListUser = await firstValueFrom(this.clientUser.send('get-user-list',payload));
     return getListUser;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
