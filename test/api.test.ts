import request from 'supertest';

import * as availabilityService from '../src/services/availability.service';

import app from '../src/app';
import { Availability } from '@prisma/client';

describe('GET /api/v1', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'API - 👋🌎🌍🌏' }, done);
  });
});

describe('GET /api/v1/availabilities', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns an error when "guideId" is not an integer', async () => {
    const guideId = 'abc';
    const res = await request(app)
      .get('/api/v1/availabilities')
      .query({ guideId })
      .set('Accept', 'application/json')
      .expect(400);
    const expected = [
      {
        code: 'invalid_type',
        expected: 'number',
        received: 'nan',
        path: ['guideId'],
        message: 'Expected number, received nan',
      },
    ];
    expect(res.body).toEqual(expected);
  });

  it('responds with an error from "findAvailabilities"', async () => {
    const error = new Error('Something went wrong...');
    jest.spyOn(availabilityService, 'findAvailabilities').mockRejectedValue(error);

    const res = await request(app).get('/api/v1/availabilities').set('Accept', 'application/json').expect(500);
    const expected = {
      error: error.message,
    };
    expect(res.body).toEqual(expected);
  });

  it('responds with a result from "findAvailabilities"', async () => {
    const response: Availability[] = [];
    jest.spyOn(availabilityService, 'findAvailabilities').mockResolvedValue(response);

    const res = await request(app).get('/api/v1/availabilities').set('Accept', 'application/json').expect(200);
    expect(res.body).toEqual(response);
  });

  it('passes "guideId" to "findAvailabilities" and returns', async () => {
    const guideId = 3;
    const response: Availability[] = [];
    jest.spyOn(availabilityService, 'findAvailabilities').mockResolvedValue(response);

    const res = await request(app)
      .get('/api/v1/availabilities')
      .query({ guideId })
      .set('Accept', 'application/json')
      .expect(200);
    expect(res.body).toEqual(response);
    expect(availabilityService.findAvailabilities).toHaveBeenCalledWith(guideId);
  });
});
