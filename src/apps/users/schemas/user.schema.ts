import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'Users' })
export class UserDocument extends Document {
  @Prop({ type: String, default: () => uuidv4() })
  uuid: string;

  @Prop()
  name: string;

  @Prop()
  first_name: string;

  @Prop()
  second_name: string;

  @Prop({ type: Date, nullable: false })
  date_of_birth: Date;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  ocupation: string;

  @Prop()
  phone: string;

  @Prop()
  reason: string;

  @Prop()
  sex: string;

  @Prop({ type: Boolean, default: true })
  enabled: boolean;

  @Prop({ type: Date, nullable: false, default: Date.now() })
  created_at: number;

  @Prop({ type: Date, nullable: false, default: Date.now() })
  updated_at: number;

  @Prop({ type: Date, nullable: true, default: null })
  deleted_at: number;

  @Prop({ type: Date, nullable: false, default: null })
  confirmation_at: Date;

  @Prop({ type: Array })
  permissions: string[];

  @Prop({ type: Array })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
