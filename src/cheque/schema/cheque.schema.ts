import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChequeDocument = Cheque & Document;

@Schema({ timestamps: true, collection: 'Cheque' })
export class Cheque {
  @Prop({ type: String, default: '', required: true })
  public customer: string;

  @Prop({ type: Number, default: 1, required: true })
  public serial: number;

  @Prop({ type: String, default: '', required: true })
  public dueDate: string;

  @Prop({ type: Number, default: 1, required: true })
  public amount: number;

  @Prop({ type: Boolean, default: false, required: true })
  public status: boolean;

  @Prop({ type: [], default: [], required: true })
  public dateHistory: string[];
}

export const ChequeSchema = SchemaFactory.createForClass(Cheque);
