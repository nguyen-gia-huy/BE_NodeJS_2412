import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
const app = express();
app.use(cookieParser());
dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(
  session({
    secret: "your_ssercret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000,
    },
  })
);
declare module "express-session" {
  interface SessionData {
    user: Record<string, string | number>;
  }
}
app.get("/login", (req: Request, res: Response) => {
  req.session.user = {
    id: 1,
    name: "huy",
  };
  res.json({
    message: "dang nhap thanh cong",
  });
});
app.get("/profile", (req: Request, res: Response) => {
  if (req.session.user) {
    res.json({
      message: "thong tin nguoi dung",
      user: req.session.user,
    });
  } else {
    res.json({
      message: "chua dang nhap",
    });
  }
});
app.get("/set-cookie", (req: Request, res: Response) => {
  res.cookie("username", "huy", {
    maxAge: 60000,
    httpOnly: true,
  });
  res.json({
    message: "Coolie da duoc thiet lap",
  });
});

app.get("/get-cookie", (req: Request, res: Response) => {
  const username = req?.cookies?.username;
  console.log();
  res.json({
    message: ` username la : ${username}`,
  });
});

app.listen(PORT, () => {
  console.log("Code đã được chỉnh sửa");
  console.log("Server is running on port", PORT);
});
