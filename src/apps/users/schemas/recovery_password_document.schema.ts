import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'temp-recovery-password-code' })
export class RecoveryPasswordCodeDocument extends Document {
  @Prop()
  user_uuid: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ nullable: false })
  recovery_password_method: string;

  @Prop({ nullable: false })
  recovery_password_code: string;

  @Prop({ nullable: false, default: new Date() })
  created_at: Date;
}

export const RecoveryPasswordCodeDocumentSchema = SchemaFactory.createForClass(
  RecoveryPasswordCodeDocument,
);
