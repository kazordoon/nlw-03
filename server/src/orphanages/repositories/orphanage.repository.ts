import { EntityRepository, Repository } from 'typeorm';
import { Orphanage } from '../entities/orphanage.entity';
import { CreateOrphanageDTO } from '../dto/create-orphanage.dto';

@EntityRepository(Orphanage)
export class OrphanageRepository extends Repository<Orphanage> {
  public async createOrphanage({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours: openingHours,
    open_on_weekends: openOnWeekends,
  }: CreateOrphanageDTO) {
    const orphanage = this.create();
    orphanage.name = name;
    orphanage.geolocation = `(${latitude}, ${longitude})`;
    orphanage.about = about;
    orphanage.instructions = instructions;
    orphanage.opening_hours = openingHours;
    orphanage.open_on_weekends = openOnWeekends;

    await this.save(orphanage);
    return orphanage;
  }
}
