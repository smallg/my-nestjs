import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { ForbiddenException } from 'src/common/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { JoiValidationPipe } from 'src/common/pipe/joi-validation.pipe';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  getCat(@Param('id', ParseIntPipe) id: number): string {
    return `cat id: ${id}`;
  }

  @Get('cat/:uuid')
  getCatByUuid(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return `cat uuid: ${uuid}`;
  }

  @Delete('/:id')
  deleteCat() {
    throw new ForbiddenException();
  }
}
