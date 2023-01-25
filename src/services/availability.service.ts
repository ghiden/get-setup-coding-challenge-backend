import prisma from '../db.server';
import { CreateAvailabilityParams } from '../schemas/create-availability.schema';

export async function findAvailabilities(guideId?: number) {
  try {
    if (guideId) {
      const options = { where: { guideId } };
      return await prisma.availability.findMany(options);
    }
    return await prisma.availability.findMany();
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createAvailability(createParams: CreateAvailabilityParams) {
  try {
    return await prisma.availability.create({ data: createParams });
  } catch (err) {
    console.error(err);
    throw err;
  }
}
