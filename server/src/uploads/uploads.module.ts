import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadsConfigService } from './uploads-config.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [UploadsConfigService],
      useClass: UploadsConfigService,
    }),
  ],
  exports: [MulterModule],
})
export class UploadsModule {}
