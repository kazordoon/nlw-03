import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const envPaths = {
  development: '.env',
  test: '.env.test',
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envPaths[process.env.NODE_ENV],
    }),
  ],
})
export class EnvironmentVariablesModule {}
