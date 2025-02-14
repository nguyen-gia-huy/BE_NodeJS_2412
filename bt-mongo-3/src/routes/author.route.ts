import express, { Router } from "express";
import { createAuthor } from "../controllers/author.controller";

const router = Router();

router.post("/", createAuthor);

export default router;
