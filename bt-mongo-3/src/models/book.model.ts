import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  publishedDate: Date;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    publishedDate: { type: Date, required: true },
  },
  { timestamps: true }
);

BookSchema.index({ title: 1 });

export default mongoose.model<IBook>("Book", BookSchema);