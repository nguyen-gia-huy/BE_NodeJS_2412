import express from "express";

import {
  addCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controlers/courses.controlers";
const router = express.Router();
router.post("/", addCourse);
router.get("/", getCourses);
router.get("/:id", getCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
export default router;
