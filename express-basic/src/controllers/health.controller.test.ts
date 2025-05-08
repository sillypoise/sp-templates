import app from '@app';
import request from 'supertest';

describe('GET /api/health', () => {
  it('should return 200 with status ok', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        status: 'ok',
        timestamp: expect.any(String),
      })
    );
  });
});

