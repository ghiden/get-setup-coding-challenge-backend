import { findAvailabilities } from './availability.service';
import type { Availability, Guide } from '@prisma/client';
import prisma from '../db.server';

describe('findAvailabilities', () => {
  const guideAInfo = { email: 'a@example.com', name: 'A' };
  const guideBInfo = { email: 'b@example.com', name: 'B' };

  let guideA: Guide;
  let guideB: Guide;
  let availability1: Availability;

  beforeEach(async () => {
    await prisma.availability.deleteMany();
    await prisma.guide.deleteMany();

    guideA = await prisma.guide.create({ data: { ...guideAInfo } });
    guideB = await prisma.guide.create({ data: { ...guideBInfo } });

    availability1 = {
      startAt: new Date('2023-01-01 12:00'),
      endAt: new Date('2023-01-01 14:00'),
      guideId: guideA.id,
    } as Availability;
    await prisma.availability.create({ data: availability1 });
  });

  test('should return all availabilities when guideId is not given', async () => {
    const res = await findAvailabilities();
    expect(res.length).toEqual(1);
    const expected = [
      {
        ...availability1,
        id: expect.anything(),
      },
    ];
    expect(res).toEqual(expected);
  });

  test('should return matching availabilities when guideId is given', async () => {
    const guideId = guideA.id;

    const res = await findAvailabilities(guideId);
    const expected = [
      {
        ...availability1,
        id: expect.anything(),
      },
    ];
    expect(res).toEqual(expected);
  });

  test('should return an empty array when guideId has no availabilies', async () => {
    const guideId = guideB.id;

    const res = await findAvailabilities(guideId);
    const expected: Availability[] = [];
    expect(res).toEqual(expected);
  });
});
