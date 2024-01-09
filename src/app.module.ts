import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Configs from 'src/common/configs/index';
import { RmqModule } from './providers/queue/rabbitmq/rmq.module';
import { FrameworkModule } from './framework/framework.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    RmqModule,
    FrameworkModule,
  ],
})
export class AppModule {}
