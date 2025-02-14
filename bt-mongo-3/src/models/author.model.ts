import mongoose, { Schema, Document } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  birthdate: Date;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true, unique: true },
    birthdate: { type: Date, required: true },
  },
  { timestamps: true }
);

AuthorSchema.index({ name: 1 });

export default mongoose.model<IAuthor>("Author", AuthorSchema);