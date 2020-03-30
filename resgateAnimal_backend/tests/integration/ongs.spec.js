const request = require('supertest');
const router = require('../../src/router/router');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    let ong_id = '';

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create an ONG account', async () => {
        const response = await request(router)
        .post('/ongs')
        // .set('ong_id', 'valor')
        .send({
            "name": "testName",
            "email": "contato@testName.com.br",
            "whatsapp": "41999999999",
            "city": "Test",
            "uf": "TT"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        ong_id = response.body.id;
    });

    it('should be able to login with recently created ONG account id', async () => {
        const response = await request(router)
        .post('/sessions')
        .send({
            "id": ong_id,
        });

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(ong_id);
        expect(response.body.name).toBe("testName");
        expect(response.body.email).toBe("contato@testName.com.br");
        expect(response.body.whatsapp).toBe("41999999999");
        expect(response.body.city).toBe("Test");
        expect(response.body.uf).toBe("TT");
    });
});

