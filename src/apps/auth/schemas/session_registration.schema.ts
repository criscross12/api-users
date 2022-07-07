import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Session-registration' })
export class SessionRegistrationDocument extends Document {
  @Prop()
  user_uuid: string;

  @Prop()
  uuid_device: string;

  @Prop()
  token: string;

  @Prop({ length: 200, nullable: true })
  key_refresh_token: string;

  @Prop({ nullable: false, default: new Date() })
  started_at: Date;

  @Prop({ nullable: false, default: null })
  end_at: Date;
}

export const SessionRegistrationSchema = SchemaFactory.createForClass(
  SessionRegistrationDocument,
);
