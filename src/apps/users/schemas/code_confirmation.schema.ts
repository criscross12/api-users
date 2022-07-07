import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'temp-account-confirmation' })
export class AccountConfirmationDocument extends Document {
  @Prop()
  user_uuid: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop({ nullable: false })
  code_confirmation: string;

  @Prop({ nullable: false })
  account_confirmation_method: string;

  @Prop({ nullable: false, default: new Date() })
  created_at: Date;
}

export const AccountConfirmationSchema = SchemaFactory.createForClass(
  AccountConfirmationDocument,
);
