import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authorRouter from "./routes/author.route";
import categoryRouter from "./routes/category.route";
import bookRouter from "./routes/book.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/libaryManagement";

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Kết nối đến MongoDB thành công");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Lỗi kết nối đến MongoDB:", error);
    process.exit(1);
  }
};

app.use(express.json());
app.use("/api/authors", authorRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/books", bookRouter);

connectDB();
