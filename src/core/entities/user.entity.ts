import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  profilePicture: string;

  @Prop({ default: true })
  status: boolean;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  followers: mongoose.Schema.Types.ObjectId[];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  following: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});
