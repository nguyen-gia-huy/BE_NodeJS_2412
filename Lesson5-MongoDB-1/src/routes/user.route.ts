import { Router } from 'express';
import { createUserWithProfile, deleteUser, getUsers, updateUser } from '../controllers/user.controller';

const router = Router();

router.post('/', createUserWithProfile);
router.get('/', getUsers);
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)
export default router;
