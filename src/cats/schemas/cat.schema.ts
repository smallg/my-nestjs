import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as joi from 'joi';
import mongoose from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);

export const createCatSchema = joi.object({
  name: joi.string().required(),
  age: joi.number().required(),
  breed: joi.string().required(),
});
