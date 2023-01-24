import type { Availability } from '@prisma/client';
import express from 'express';
import { ZodError } from 'zod';
import { prisma } from '../db.server';
import { AvailabilityQueryParams, AvailabilityQueryParamsSchema } from '../schemas/availability-query-params.schema';

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

  let availabilities: Availability[];
  if (queryParams.guideId) {
    availabilities = await prisma.availability.findMany({ where: { guideId: queryParams.guideId } });
  } else {
    availabilities = await prisma.availability.findMany();
  }
  res.json(availabilities);
});

export default router;
