import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: mongoose.Schema.Types.ObjectId;

  @Prop([String])
  images: string[];

  @Prop()
  description: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  likes: mongoose.Schema.Types.ObjectId[];

  @Prop([
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: String,
    },
  ])
  comments: { user_id: mongoose.Schema.Types.ObjectId; text: string }[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
