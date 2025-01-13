import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { courses } from "../models/courses.models";
import { Review } from "../dto/reviews.dto";
import Joi from "joi";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenhuy3112005@gmail.com",
    pass: "hfdjpquvaviwhmqq",
  },
});

const reviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(10).max(300).required(),
  studentEmail: Joi.string().email().required(),
});

export const addReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment, studentEmail } = req.body;
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const course = courses.find((course) => course.courseId === id);
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }

  const newReview: Review = {
    id: uuidv4(),
    courseId: id,
    rating,
    comment,
    studentEmail,
  };

  course.reviews.push(newReview);

  try {
    const info = await transporter.sendMail({
      from: "nguyenhuy3112005@gmail.com",
      to: course.teacherEmail,
      subject: `New review for your course ${course.course}`,
      text: `A new review has been added to your course ${course.course}: ${comment}`,
    });
    console.log("Message sent: %s", info.messageId);
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReviews = (req: Request, res: Response) => {
  const { id } = req.params;
  const course = courses.find((course) => course.courseId === id);
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }
  res.status(200).json({ reviews: course.reviews });
};

export const updateReview = (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment, studentEmail } = req.body;
  const reviewIndex = courses
    .flatMap((course) => course.reviews)
    .findIndex((review) => review.id === id);
  if (reviewIndex === -1) {
    res.status(404).json({ message: "Review not found" });
    return;
  }

  const course = courses.find((course) => course.reviews.some((review) => review.id === id));
  if (!course) {
    res.status(404).json({ message: "Course not found" });
    return;
  }

  const updatedReview = {
    id,
    courseId: course.courseId,
    rating,
    comment,
    studentEmail,
  };

  courses.flatMap((course) => course.reviews)[reviewIndex] = updatedReview;
  res
    .status(200)
    .json({ message: "Review updated successfully", review: updatedReview });
};
