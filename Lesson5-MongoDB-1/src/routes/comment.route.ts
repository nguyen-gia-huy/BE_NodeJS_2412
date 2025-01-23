import express from 'express';
import { createComment, getCommentByPostId } from '../controllers/comment.controller';
const router = express.Router();
router.post('/', createComment);
router.get('/:post_id', getCommentByPostId);
export default router;