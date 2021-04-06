import { Router } from 'express';
import auth from './auth';
import deck from './deck';

const router = Router();

router.use('/auth', auth);
router.use('/deck', deck);

export default router;
