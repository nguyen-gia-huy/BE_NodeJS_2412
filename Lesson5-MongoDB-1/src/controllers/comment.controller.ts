import { Request, Response } from "express";
import commentModel from "../models/comment.model";
import postModel from "../models/post.model";
export const createComment = async (req: Request, res: Response) => {
  try {
    const { text, author, post_id } = req.body;
    //kiem tra xem post_id co ton tai hay khong
    const post = await postModel.findById(post_id);
    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
      return;
    }
    const newComment = new commentModel({
      text,
      author,
      post_id,
    });
    await newComment.save();
    //them id cua binh luan vao mang comments cua post
    post.comments.push(newComment._id);
    await post.save();
    res.status(201).json({
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
//lay tat ca binh luan cua bai viet
export const getCommentByPostId = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;
    const comments = await commentModel.find({ post_id });
    res.status(200).json({
      message: "Get all comments successfully",
      data: comments,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
