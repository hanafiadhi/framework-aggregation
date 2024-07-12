import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RmqModule } from '../providers/queue/rabbitmq/rmq.module';
import { AUTH_QUEUE, USER_QUEUE } from '../common/constants/services';

@Module({
  imports: [
    RmqModule.register({ name: USER_QUEUE }),
    RmqModule.register({ name: AUTH_QUEUE }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
