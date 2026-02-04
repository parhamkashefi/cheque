import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: "User" })
export class User {
    @Prop({ type: String, required: true })
    public name: string;

    @Prop({ type: Number, required: true })
    public phoneNumber: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
