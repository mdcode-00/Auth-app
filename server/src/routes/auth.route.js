import express from 'express'
import { LogInController, LogOutController, RefreshController, SingInController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/singin', SingInController)
router.post('/login', LogInController)
router.post('/logout', LogOutController)


router.get('/refresh', RefreshController)


export default router;