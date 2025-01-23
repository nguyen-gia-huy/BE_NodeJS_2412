import { Request, Response } from "express";
import Post from "../models/post.model";
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content,
      comments: [],
    });
    await newPost.save();
    res.status(201).json({
        message: "Post created successfully",
        data: newPost,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
//lay tat ca bai viet va binh luan cua bai viet do
export const getPost = async (req: Request, res: Response) => {
    try{
        const posts = await Post.find().populate("comments");
        res.status(200).json({
            message: "Get all posts successfully",
            data: posts,
        })
    }catch(err:any){
        res.status(500).json({ message: err.message });
    }
}