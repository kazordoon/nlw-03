import { Injectable } from '@nestjs/common';
import { Orphanage } from '../orphanages/entities/orphanage.entity';
import { Geolocation } from '../contracts/Geolocation';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ViewsService {
  constructor(private configService: ConfigService) {}

  public renderOne({
    id,
    name,
    geolocation,
    about,
    instructions,
    opening_hours: openingHours,
    open_on_weekends: openOnWeekends,
    images,
  }: Orphanage) {
    const { x: latitude, y: longitude } = geolocation as Geolocation;

    const serializedImages = images.map(image => {
      const HOST = this.configService.get('APP_HOST');
      const PORT = this.configService.get('APP_PORT');
      return {
        id: image.id,
        path: `http://${HOST}:${PORT}/uploads/${image.path}`,
      };
    });

    return {
      id,
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours: openingHours,
      open_on_weekends: openOnWeekends,
      images: serializedImages,
    };
  }

  public renderMany(orphanages: Orphanage[]) {
    return orphanages.map(orphanage => this.renderOne(orphanage));
  }
}
