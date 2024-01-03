import express from 'express';
import { getusers } from '../Controllers/UserController.js';
const router = express.Router();

router.get('/users', getusers);

export default router;