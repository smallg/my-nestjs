import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ForbiddenException } from 'src/common/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/common/filter/http-exception.filter';
// import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  // @Post()
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/:id')
  getCat(): string {
    return 'cat';
  }

  @Delete('/:id')
  deleteCat() {
    throw new ForbiddenException();
  }
}
