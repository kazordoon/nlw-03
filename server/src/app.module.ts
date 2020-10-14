import { Module } from '@nestjs/common';
import { EnvironmentVariablesModule } from './environment-variables/environment-variables.module';
import { DatabaseModule } from './database/database.module';
import { OrphanagesModule } from './orphanages/orphanages.module';

@Module({
  imports: [EnvironmentVariablesModule, DatabaseModule, OrphanagesModule],
})
export class AppModule {}
