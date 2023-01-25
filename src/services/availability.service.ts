import prisma from '../db.server';

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
