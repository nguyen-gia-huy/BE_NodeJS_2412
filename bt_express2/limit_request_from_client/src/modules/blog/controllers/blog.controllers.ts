import { Request, Response } from "express";
import { blogs } from "../models/blog.models";
import rateLimit from "express-rate-limit";
import { v4 as uuidv4 } from "uuid";
const getBlogsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests, please try again later.",
});
const addBlogLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later.",
});
export const addBlog = [
  addBlogLimiter,
  (req: Request, res: Response) => {
    const { title, content } = req.body;
    const newBlog = {
      id: uuidv4(),
      title,
      content,
    };
    blogs.push(newBlog);
    res.status(201).json(newBlog);
  },
];

export const getBlogs = [
  getBlogsLimiter,
  (req: Request, res: Response) => {
    res.json(blogs);
  },
];
