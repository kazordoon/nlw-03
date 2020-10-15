import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ViewsService, ConfigService],
  exports: [ViewsService],
})
export class ViewsModule {}
