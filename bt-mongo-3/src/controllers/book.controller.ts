import { Request, Response } from "express";
import Book from "../models/book.model";
import { CreateBookDTO } from "../dto/book.dto";

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, category, publishedDate }: CreateBookDTO = req.body;
    const book = new Book({ title, author, category, publishedDate });
    await book.save();
    res.status(201).json({ message: "Book tao moi thanh cong", book });
  } catch (error) {
    res.status(500).json({ message: "loi khi tao moi book", error });
  }
};
