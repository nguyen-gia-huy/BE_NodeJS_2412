import express from "express";
import { addReview, getReviews, updateReview } from "../controlers/reviews.controller";


const router = express.Router();

router.post("/:id/reviews", addReview);
router.get("/:id/reviews", getReviews);
router.put("/reviews/:id", updateReview);

export default router