import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.use(protectRoute);

router.get('/recommendations', UserController.getRecommendedUsers);
router.get('/friends', UserController.getFriends);
router.post('/send-friend-request/:id', UserController.sendFriendRequest);
router.put('/update-friend-request-status/:id', UserController.updateFriendRequestStatus);
router.get('/friend-requests', UserController.getFriendRequests);

export default router;