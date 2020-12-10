const request = require('supertest');

let server;

describe('/HOME', () => {
    beforeEach(() => {server = require('../../server');});
    afterEach(() => {server.close();});

    describe('GET /', () => {
        it('should return Home Page',async() => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
    });
});