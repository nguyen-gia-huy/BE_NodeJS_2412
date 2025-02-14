import { Request, Response } from "express";
import Category from "../models/category.model";
import { CreateCategoryDTO } from "../dto/category.dto";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name }: CreateCategoryDTO = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: "Category duoc tao thanh cong", category });
  } catch (error) {
    res.status(500).json({ message: "loi khi tao category", error });
  }
};
