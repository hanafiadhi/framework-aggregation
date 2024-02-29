import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RmqModule } from 'src/providers/queue/rabbitmq/rmq.module';
import { AUTH_QUEUE, USER_QUEUE } from 'src/common/constants/services';

@Module({
  imports: [
    RmqModule.register({ name: USER_QUEUE }),
    RmqModule.register({ name: AUTH_QUEUE }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
