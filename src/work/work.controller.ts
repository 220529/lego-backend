import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Delete,
  Request,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { Work } from './schemas/work.schema';

@ApiTags('work')
@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async findAll(
    @Query('pageNo', ParseIntPipe) pageNo: number = 1,
    @Query('pageSize', ParseIntPipe) pageSize: number = 10,
    @Query('title') title: string,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'asc' | 'desc',
  ): Promise<{
    list: Work[];
    total: number;
    pageNo: number;
    pageSize: number;
  }> {
    return this.workService.findAll(pageNo, pageSize, title, sortBy, sortOrder);
  }

  @Post()
  create(@Body() createWorkDto: CreateWorkDto, @Request() req): Promise<Work> {
    return this.workService.create(createWorkDto, req.user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkDto: UpdateWorkDto,
  ): Promise<Work> {
    return this.workService.update(id, updateWorkDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Work> {
    return this.workService.findOne(id);
  }

  @Get('copy/:id')
  copyOne(@Param('id') id: string, @Request() req): Promise<Work> {
    return this.workService.copyOne(id, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Work> {
    return this.workService.remove(id);
  }
}
