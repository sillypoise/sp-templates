import { Router } from 'express';
import { handleGetUsers, handleCreateUser } from '@controllers/users.controller';

const router = Router();

router.get('/', handleGetUsers);
router.post('/', handleCreateUser);

export default router;

