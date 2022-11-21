// \src\users\schemas\users.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document

@Schema()
export class Users extends Document {
  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  email: string

  @Prop({ required: true,select:false })
  password: string
}
export const UsersSchema = SchemaFactory.createForClass(Users);