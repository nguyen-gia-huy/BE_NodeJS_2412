import { error } from "console";
import express, { Request, Response } from "express";
import Joi from "joi";
import { body, validationResult } from "express-validator";
import Queue from "bull";
import cron from "node-cron";
import rateLimit from "express-rate-limit";
const app = express();
app.use(express.json());
const PORT = 8080;

const emailQueue = new Queue("emailQueue");

const limiter = rateLimit({
  windowMs: 15 * 30 * 1000,
  max: 5,
  message:'ban da thuc hien qua nhieu request trong 1 phut'
});
app.use(limiter)
const schema = Joi.object({
  username: Joi.string().min(2).max(30).required().messages({
    "string.base": ` "a" shoud be a type of text `,
    "string.empty": ` "a" can not be empte `,
    "string.min": ` "a" username qua ngan `,
  }),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(24).required(),
});
app.post("/api/v1/auth/register", (req: Request, res: Response) => {
  //Validation thong tin ***Thủ Công***
  //   const { username, email, password } = req.body;
  //   if (!username || !email || !password) {
  //     res.status(400).json({
  //       error: "vui long nhap day du",
  //     });
  //     return;
  //   }
  //   if (!email.includes("@gmail.com")) {
  //     res.status(400).json({
  //       messsage: "Email khogn hop le",
  //     });
  //     return;
  //   }
  //   if (password.length < 6 || password.length > 24) {
  //     res.status(400).json({
  //       error: "mat khau phai tu 6-24 ky tu",
  //     });
  //     return;
  //   }
  //Validation thong tin ***Thư viện Joi***
  const info = req.body;
  const { error } = schema.validate(info);
  if (error) {
    res.status(400).json({
      error: error.details[0].message,
    });
    return;
  }
  emailQueue.add({ email: info.email });

  res.status(200).json({
    message: "dang ky thanh cong",
  });
});
emailQueue.process(async (job) => {
  console.log('Processing job:', job.data);
  const email = job.data.email;
  console.log(`da guii email toi ${email}`);
});
//Validation sử dụng thư viện express vaildator
const validator = [
  body("email")
    .notEmpty()
    .withMessage("email la truong bat buoc")
    .isEmail()
    .withMessage("email chua hop le"),
  body("password")
    .notEmpty()
    .withMessage("password la truong bat buoc")
    .isByteLength({ min: 6, max: 24 })
    .withMessage("password chua hop le"),
];
app.post("/api/v1/auth/login", validator, (req: Request, res: Response) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    res.status(400).json({
      error: erros.array(),
    });
    return;
  }
  res.status(200).json({
    message: "login thanh cong",
  });
});
// app.post("/api/v1/auth/send-email", (req: Request, res: Response) => {
//   const { email } = req.body;
// });
// cron.schedule('*/1 * * * * ',()=>{
//     console.log('cronjob dang dc chay')
// })
app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
