import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'temp-recovery-password-token' })
export class RecoveryPasswordTokenDocument extends Document {
  @Prop()
  user_uuid: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ nullable: false })
  recovery_password_method: string;

  @Prop({ nullable: false })
  recovery_password_token: string;

  @Prop({ nullable: false })
  token: string;

  @Prop({ nullable: false, default: new Date() })
  created_at: Date;
}

export const RecoveryPasswordTokenDocumentSchema = SchemaFactory.createForClass(
  RecoveryPasswordTokenDocument,
);
