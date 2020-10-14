import { Controller, Post, Body, HttpCode, Get, Param } from '@nestjs/common';
import { OrphanagesService } from './orphanages.service';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';

@Controller('orphanages')
export class OrphanagesController {
  constructor(private readonly orphanagesService: OrphanagesService) {}

  @Get()
  public async index() {
    return this.orphanagesService.getAll();
  }

  @Get(':id')
  public async show(@Param('id') id: number) {
    return this.orphanagesService.getOne(id);
  }

  @HttpCode(201)
  @Post()
  public async store(@Body() createOrphanageDTO: CreateOrphanageDTO) {
    return this.orphanagesService.create(createOrphanageDTO);
  }
}
