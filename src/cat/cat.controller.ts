import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { Cat } from './cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catService.create(createCatDto);
  }

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Cat> {
    return this.catService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    return this.catService.update(id, updateCatDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Cat> {
    return this.catService.remove(id);
  }
}
