import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { OrphanagesService } from './orphanages.service';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';

@Controller('orphanages')
export class OrphanagesController {
  constructor(private readonly orphanagesService: OrphanagesService) {}

  @Get()
  public async index() {
    return this.orphanagesService.getAll();
  }

  @HttpCode(201)
  @Post()
  public store(@Body() createOrphanageDTO: CreateOrphanageDTO) {
    return this.orphanagesService.create(createOrphanageDTO);
  }
}
