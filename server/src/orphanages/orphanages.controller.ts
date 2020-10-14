import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { OrphanagesService } from './orphanages.service';
import { CreateOrphanageDTO } from './dto/create-orphanage.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  @UseInterceptors(FilesInterceptor('images'))
  @HttpCode(201)
  @Post()
  public async store(
    @Body() createOrphanageDTO: CreateOrphanageDTO,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.orphanagesService.create(createOrphanageDTO, images);
  }
}
