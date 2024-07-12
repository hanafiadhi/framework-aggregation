import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import AppConfig from './common/configs/index';
import { RmqModule } from './providers/queue/rabbitmq/rmq.module';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      load: AppConfig,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
    }),
    RmqModule,
    UserModule,
    HealthModule,
  ],
})
export class AppModule {}
