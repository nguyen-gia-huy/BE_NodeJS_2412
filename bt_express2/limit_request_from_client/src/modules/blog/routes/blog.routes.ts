import express from 'express';
const router = express.Router();
import { addBlog, getBlogs } from '../controllers/blog.controllers';
router.post('/', addBlog);
router.get('/', getBlogs);
export default router;