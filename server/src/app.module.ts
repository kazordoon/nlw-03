import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentVariablesModule } from './environment-variables/environment-variables.module';
import { DatabaseModule } from './database/database.module';
import { OrphanagesModule } from './orphanages/orphanages.module';

@Module({
  imports: [EnvironmentVariablesModule, DatabaseModule, OrphanagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
