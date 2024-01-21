import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RmqModule } from 'src/providers/queue/rabbitmq/rmq.module';
import { USER_CONSUMER } from 'src/common/constants/services';

@Module({
  imports: [RmqModule.register({ name: USER_CONSUMER })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
