import express from 'express';
import ChatController from '../controllers/chat.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/stream-token', protectRoute, ChatController.getStreamToken);

export default router;