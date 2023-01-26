import express from 'express';
import { ZodError } from 'zod';
import { AvailabilityQueryParams, AvailabilityQueryParamsSchema } from '../schemas/availability-query-params.schema';
import { CreateAvailabilityParams, CreateAvailabilityParamsSchema } from '../schemas/create-availability.schema';
import { createAvailability, findAvailabilities } from '../services/availability.service';

const router = express.Router();

/**
 * @openapi
 * /api/v1/availabilities:
 *   get:
 *     tags:
 *       - Availability
 *     description: Retrieve availabilities
 *     parameters:
 *       - in: query
 *         name: guideId
 *         schema:
 *           type: integer
 *         description: Guide ID
 *     responses:
 *       200:
 *         description: Return availabilities
 */
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

/**
 * @openapi
 * /api/v1/availabilities:
 *   post:
 *     tags:
 *       - Availability
 *     description: Create an availability
 *     requestBody:
 *       required: true,
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["guideId", "availability"]
 *             properties:
 *               guideId:
 *                 type: integer
 *                 example: 1
 *               availability:
 *                 type: object
 *                 required: ["startAt", "endAt"]
 *                 properties:
 *                   startAt:
 *                     type: string
 *                     example: "2023-01-31T10:00:00.000Z"
 *                   endAt:
 *                     type: string
 *                     example: "2023-01-31T12:00:00.000Z"
 *     responses:
 *       200:
 *         description: Return new availability
 */
router.post('/', async (req, res) => {
  let params: CreateAvailabilityParams;

  try {
    params = CreateAvailabilityParamsSchema.parse(req.body);
  } catch (err) {
    const zodError = err as ZodError;
    console.error(zodError.issues);
    return res.status(400).json(zodError.issues);
  }

  try {
    const availability = await createAvailability(params);
    res.json(availability);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
