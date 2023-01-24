import { z, TypeOf } from 'zod';

export const AvailabilityQueryParamsSchema = z.object({ guideId: z.coerce.number().optional() });

export type AvailabilityQueryParams = TypeOf<typeof AvailabilityQueryParamsSchema>;
