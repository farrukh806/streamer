import express from 'express'
import AuthController from '../controllers/auth.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/onboarding', protectRoute, AuthController.onboarding);
router.get('/me', protectRoute, AuthController.getCurrentUser);

export default router;
