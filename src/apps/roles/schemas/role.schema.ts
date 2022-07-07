import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'Roles' })
export class RoleDocument extends Document {
  @Prop({ type: String, default: () => uuidv4() })
  uuid: string;

  @Prop({ type: String, length: 15 })
  name: string;

  @Prop({ type: String, default: () => uuidv4() })
  key: string;

  @Prop({ type: String, length: 36, default: null })
  account_uuid: string;

  @Prop({ type: Boolean })
  internal: boolean;

  @Prop({ type: Date, length: 36, default: Date.now })
  created_at: string;

  @Prop({ type: Date, length: 36, default: null })
  updated_at: string;

  @Prop({ type: Boolean, default: false })
  locked_at: boolean;

  @Prop({ type: Boolean, default: false })
  allow_all: boolean;

  @Prop({ type: Array })
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(RoleDocument);
