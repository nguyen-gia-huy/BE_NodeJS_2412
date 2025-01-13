import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Lectures } from "../models/lecture.models";

import Joi from "joi";

import path from "path";
import { body, validationResult } from "express-validator";
const nodemailer = require("nodemailer");
const fs = require("fs");
const dataFilePath = path.join(__dirname, "lecture.json");

const readDataFromFile = () => {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data || "[]");
};
const writeDataToFile = (data: any) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};
interface Lecture {
  id: string;
  LectureName: string;
  LectureEmail: string;
  password: string;
}
const schema = Joi.object({
  LectureName: Joi.string().min(3).required(),
  LectureEmail: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const validator = [
  body("LectureName").isString().withMessage("LectureName must be a string"),
  body("LectureEmail").isEmail().withMessage("LectureEmail must be an email"),
  body("password").isString().withMessage("password must be a string"),
];
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenhuy3112005@gmail.com", // Email
    pass: "bcmcnsfuxnrlnnxl", // Mật khẩu ứng dụng
  },
});
export const Register = async (req: Request, res: Response) => {
  const { LectureName, LectureEmail, password } = req.body;
  const { error } = schema.validate(req.body);

  // const Lectures = readDataFromFile();
  const newLecture = {
    id: uuidv4(),
    LectureName,
    LectureEmail,
    password,
  };
  Lectures.push(newLecture);

  try {
    const info = await transporter.sendMail({
      from: "nguyenhuy3112005@gmail.com",
      to: LectureEmail,
      subject: "Xac nhan dang ky giang vien",
      text: `Chào ${LectureName},\n\nBạn đã đăng ký thành công hệ thống giảng viên. Chúc mừng bạn!`,
    });
    console.log("Message sent: %s", info.messageId);
    res.status(201).json({ message: "Đăng ký thành công", data: req.body });
  } catch (err) {
    res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};
export const Login = async (req: Request, res: Response) => {
  const { LectureEmail, password } = req.body;
  const Lectures = readDataFromFile();
  const Lecture = Lectures.find(
    (Lecture: Lecture) =>
      Lecture.LectureEmail === LectureEmail && Lecture.password === password
  );
  if (Lecture) {
    res.status(200).json({
      message: "Đăng nhập thành công",
      data: {
        id: Lecture.id,
        LectureName: Lecture.LectureName,
        LectureEmail: Lecture.LectureEmail,
      },
    });
  } else {
    res.status(400).json({ message: "Đăng nhập thất bại" });
  }
};
