import { Post } from '@nestjs/common';
import { Follower, FollowerSchema } from 'src/core/entities/follower.entity';
import { PostSchema } from 'src/core/entities/post.entity';
import { User, UserSchema } from 'src/core/entities/user.entity';
import {
  ChatMessage,
  ChatMessageSchema,
} from './../core/entities/chat-message.entity';
import { MongooseModule } from '@nestjs/mongoose';

export const mongooseEntitiesConfig = MongooseModule.forFeature([
  { name: ChatMessage.name, schema: ChatMessageSchema },
  { name: Follower.name, schema: FollowerSchema },
  { name: Post.name, schema: PostSchema },
  { name: User.name, schema: UserSchema },
]);
