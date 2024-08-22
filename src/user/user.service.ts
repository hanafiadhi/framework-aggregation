import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { firstValueFrom } from 'rxjs';

import { ClientProxy } from '@nestjs/microservices';
import { USER_QUEUE } from '../common/constants/services';

@Injectable()
export class UserService {
  constructor(@Inject(USER_QUEUE) private readonly clientUser: ClientProxy) {}

  async create(createUserDto: any) {
    createUserDto.is_active = true;
    const user = await firstValueFrom(
      this.clientUser.send('create-user', createUserDto),
    );
    return user;
  }

  async findAll(payload: any) {
    const getListUser = await firstValueFrom(
      this.clientUser.send('get-user-list', payload),
    );
    return getListUser;
  }

  async findOne(userId: string) {
    const getUser = await firstValueFrom(
      this.clientUser.send('get-user', userId),
    );
    if (!getUser) throw new NotFoundException('Data tidak ditemukan');
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

    if (deleteUser.deleted == 0)
      throw new NotFoundException('Data tidak ditemukan');
  }

  async resendAndChangeWhatsapp(sub: string, whatsapp: string, otp?: string) {
    const payload: { _id: string; whatsapp?: string; token?: string } = {
      _id: sub,
      ...(whatsapp && {
        whatsapp,
      }),
      ...(otp && {
        otp,
      }),
    };
    return await firstValueFrom(
      this.clientUser.send('change-whatsapp-user', payload),
    );
  }
}
