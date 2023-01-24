import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import availability from './availability';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/availabilities', availability);

export default router;
