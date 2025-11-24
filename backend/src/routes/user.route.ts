import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.use(protectRoute);

router.get('/recommendations', UserController.getRecommendedUsers);
router.get('/friends', UserController.getFriends);

export default router;