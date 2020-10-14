import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';
import { OrphanageRepository } from './repositories/orphanage.repository';

@Injectable()
export class OrphanagesService {
  constructor(private orphanagesRepository: OrphanageRepository) {}

  public async getAll() {
    const orphanages = await this.orphanagesRepository.find();
    return orphanages;
  }

  public async getOne(id: number) {
    try {
      const orphanage = await this.orphanagesRepository.findOneOrFail(id);
      return orphanage;
    } catch (err) {
      throw new NotFoundException('Orphanage not found.');
    }
  }

  public async create(createOrphanageDTO: CreateOrphanageDTO) {
    const orphanage = await this.orphanagesRepository.createOrphanage(
      createOrphanageDTO,
    );
    return { id: orphanage.id };
  }
}
