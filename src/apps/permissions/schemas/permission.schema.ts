import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'Permissions' })
export class PermissionDocument extends Document {
  @Prop({ type: String, default: () => uuidv4() })
  uuid: string;

  @Prop({ type: String, length: 15 })
  name: string;

  @Prop({ type: String, length: 36 })
  key: string;

  @Prop({ type: String, length: 36, minlength: 36, maxlength: 36 })
  api_key: string;

  @Prop({ type: Date, length: 36, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, length: 36, default: null })
  locked_at: Date;

  @Prop({ type: String, length: 36 })
  group_key: string;

  @Prop({ type: String, length: 36 })
  group_name: string;

  @Prop({ type: Boolean, default: false })
  internal: boolean;
}

export const PermissionSchema =
  SchemaFactory.createForClass(PermissionDocument);
