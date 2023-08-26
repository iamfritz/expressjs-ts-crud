import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  description: string;
  image: string;
  category: Array<String>;
  createdAt: Date;
  updatedAt: Date;    
}

const metaSchema = new mongoose.Schema({
    name: String,
    value: String,
});


const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide an Title!"],
      unique: [true, "Title already Exist"],
    },
    description: {
      required: true,
      type: String,
    },
    image: {
      type: String,
    },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    meta: [metaSchema],    
    createdAt: { type: Date },
    updatedAt: { type: Date }
  }
);

postSchema.pre("save", function (next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export default mongoose.model<IPost>('Post', postSchema);

