import * as path from 'path';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { EnvironmentVariablesModule } from './environment-variables/environment-variables.module';
import { DatabaseModule } from './database/database.module';
import { OrphanagesModule } from './orphanages/orphanages.module';
import { UploadsModule } from './uploads/uploads.module';
import { ViewsModule } from './views/views.module';

@Module({
  imports: [
    EnvironmentVariablesModule,
    DatabaseModule,
    OrphanagesModule,
    UploadsModule,
    ViewsModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'tmp', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
