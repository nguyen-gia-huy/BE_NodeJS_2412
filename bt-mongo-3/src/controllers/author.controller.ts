import { Request, Response } from "express";
import Author from "../models/author.model";
import { CreateAuthorDTO } from "../dto/author.dto";

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, birthdate }: CreateAuthorDTO = req.body;
    const author = new Author({ name, birthdate });
    await author.save();
    res.status(201).json({ message: "tao moi author thanh cong", author });
  } catch (error) {
    res.status(500).json({ message: "loi khi tao moi author", error });
  }
};
