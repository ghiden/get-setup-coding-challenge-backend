import express from 'express';
import { ZodError } from 'zod';
import { AvailabilityQueryParams, AvailabilityQueryParamsSchema } from '../schemas/availability-query-params.schema';
import { findAvailabilities } from '../services/availability.service';

const router = express.Router();

router.get('/', async (req, res) => {
  let queryParams: AvailabilityQueryParams;

  try {
    queryParams = AvailabilityQueryParamsSchema.parse(req.query);
  } catch (err) {
    const zodError = err as ZodError;
    console.error(zodError.issues);
    return res.status(400).json(zodError.issues);
  }

  try {
    const availabilities = await findAvailabilities(queryParams.guideId);
    res.json(availabilities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
