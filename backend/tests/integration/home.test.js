const request = require('supertest');

let server;

describe('/users', () => {
    beforeEach(() => {server = require('../../server');});
    afterEach(() => {
        server.close();
        // await Users.deleteMany({});
    });

    describe('GET /', () => {
        it('should return Home Page',async() => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
    });
});