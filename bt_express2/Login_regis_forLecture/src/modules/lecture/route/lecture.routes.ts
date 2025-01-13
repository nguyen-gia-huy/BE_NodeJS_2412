
import express from "express";

import {  Login, Register } from "../controllers/lecture.controlers";

const router = express.Router();

router.post("/register", Register);
router.get("/login", Login)
export default router;