const app = require('../../app');
const supertest = require('supertest')
const request = supertest(app);

it('tests lift GET endpoint', async done => {
    const response = await request.get('/lift');
    expect(response.body).toEqual({globalLifts: globalLifts, globalQueue: globalQueue});
    expect(response.status).toBe(200);
    done();
});

it('tests lift PUT endpoint', async done => {
    const response = await request.put('/lift', 1);
    expect(response.status).toBe(200);
    done();
});