import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 8;

interface IPost extends Document {
  title: string;
  summary: string;
  content: string;
  cover: string;
  author: Schema.Types.ObjectId | string;
  createdAt: Date;
}

const postSchema = new Schema<IPost>({
  title: String,
  summary: String,
  content: String,
  cover: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
