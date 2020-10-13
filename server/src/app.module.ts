import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentVariablesModule } from './environment-variables/environment-variables.module';

@Module({
  imports: [EnvironmentVariablesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
