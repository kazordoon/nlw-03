import { EntityRepository, Repository } from 'typeorm';
import { Orphanage } from '../entities/orphanage.entity';
import { CreateOrphanageDTO } from '../dto/create-orphanage.dto';
import { Image } from '../entities/image.entity';

@EntityRepository(Orphanage)
export class OrphanageRepository extends Repository<Orphanage> {
  public async createOrphanage(
    {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours: openingHours,
      open_on_weekends: openOnWeekends,
    }: CreateOrphanageDTO,
    requestImages: Express.Multer.File[],
  ) {
    const images = requestImages.map(requestImage => {
      const image = new Image();
      image.path = requestImage.filename;

      return image;
    });

    const orphanage = this.create({
      name,
      geolocation: `(${latitude}, ${longitude})`,
      about,
      instructions,
      opening_hours: openingHours,
      open_on_weekends: String(openOnWeekends) === 'true',
      images,
    });

    await this.manager.save(orphanage);
    return orphanage;
  }
}
