import { Module } from '@nestjs/common';
import { OrphanagesController } from './orphanages.controller';
import { OrphanagesService } from './orphanages.service';
import { OrphanageRepository } from './repositories/orphanage.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrphanageRepository])],
  controllers: [OrphanagesController],
  providers: [OrphanagesService],
})
export class OrphanagesModule {}
