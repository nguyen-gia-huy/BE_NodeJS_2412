import { Course } from "../dto/courses.dto";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { courses } from "../models/courses.models";

import Joi from "joi";
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenhuy3112005@gmail.com",
    pass: "hfdjpquvaviwhmqq",
  },
});

const shema = Joi.object({
  course: Joi.string().required(),
  description: Joi.string().min(6).max(24).required(),
  teacherEmail: Joi.string().email().required(),
  timeStart: Joi.string().required(),
  timeEnd: Joi.string().required(),
});
export const addCourse = async (req: Request, res: Response) => {
  const { course, description, teacherEmail, timeStart, timeEnd } = req.body;
  const { error } = shema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  const newCourse: Course = {
    courseId: uuidv4(),
    course,
    description,
    teacherEmail,
    timeStart: new Date(timeStart),
    timeEnd: new Date(timeEnd),
    reviews: [],
  };

  courses.push(newCourse);
  try {
    const info = await transporter.sendMail({
      from: "nguyenhuy3112005@gmail.com",
      to: teacherEmail,
      subject: `Đã có 1 khóa ${course} mới được tạo`,
      text: `Khóa học ${course} với mô tả ${description} sẽ bắt đầu vào lúc ${timeStart} và kết thúc vào lúc ${timeEnd}`,
    });
    console.log("Message sent: %s", info.messageId);
    res
      .status(201)
      .json({ message: "Course added successfully", data: req.body });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getCourses = (req: Request, res: Response) => {
  const courseQuery = req.query.course as string;
  const result = courses.filter((course) => {
    let condition1 = true;
    if (courseQuery) {
      condition1 = course.course === courseQuery;
    }
    return condition1;
  });
  res.status(200).json({ courses: result });
};
export const getCourse = (req: Request, res: Response) => {
  const { id } = req.params;
  const course = courses.find((course) => course.courseId === id);
  if (!course) {
    res.status(404).json({ message: "Course not found" });
  }
  res.status(200).json({ course });
};
export const updateCourse = (req: Request, res: Response) => {
  const { id } = req.params;
  const { course, description, teacherEmail, timeStart, timeEnd } = req.body;
  const courseIndex = courses.findIndex((course) => course.courseId === id);
  if (courseIndex !== -1) {
    const updatedCourse = {
      courseId: id,
      course,
      description,
      teacherEmail,
      timeStart,
      timeEnd,
      reviews: courses[courseIndex].reviews,
    };
    courses[courseIndex] = updatedCourse;
    res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};
export const deleteCourse = (req: Request, res: Response) => {
  const { id } = req.params;
  const courseIndex = courses.findIndex((course) => course.courseId === id);
  if (courseIndex !== -1) {
    courses.splice(courseIndex, 1);
    res.status(200).json({ message: "Course deleted successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
};
