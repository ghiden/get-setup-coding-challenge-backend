import { z, TypeOf } from 'zod';

export const CreateAvailabilityParamsSchema = z
  .object({
    guideId: z.coerce.number(),
    availability: z.object({
      startAt: z.string().datetime(),
      endAt: z.string().datetime(),
    }),
  })
  .transform(({ guideId, availability }) => {
    const startAt = new Date(availability.startAt);
    const endAt = new Date(availability.endAt);
    return {
      guideId,
      startAt,
      endAt,
    };
  });

export type CreateAvailabilityParams = TypeOf<typeof CreateAvailabilityParamsSchema>;
