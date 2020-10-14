import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrphanagesController } from './orphanages.controller';
import { OrphanagesService } from './orphanages.service';
import { OrphanageRepository } from './repositories/orphanage.repository';
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrphanageRepository]), UploadsModule],
  controllers: [OrphanagesController],
  providers: [OrphanagesService],
})
export class OrphanagesModule {}
