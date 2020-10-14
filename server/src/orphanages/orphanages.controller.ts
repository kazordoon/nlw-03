import { Controller, Post, Body } from '@nestjs/common';
import { OrphanagesService } from './orphanages.service';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';

@Controller('orphanages')
export class OrphanagesController {
  constructor(private readonly orphanagesService: OrphanagesService) {}

  @Post()
  public store(@Body() createOrphanageDTO: CreateOrphanageDTO) {
    return this.orphanagesService.create(createOrphanageDTO);
  }
}
