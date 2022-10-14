const request = require('supertest');
const chai = require('chai');  // Using Expect style
const pool = require('../../../src/configs/db.config')

const app = require('../../../index');

describe('GET /menu', () => { 
    test("should return 200", async () => {
        const response = await request(app).get("/menu");
        
        
        expect(response.statusCode).toBe(200);
    });

    test("should have more than 0 rows", async () => {
        const response = await request(app).get("/menu");
        
        expect(response.body.length).not.toBe(0);
    }); 
});

describe('GET /menu/:drink-id/price-history', () => {
    test("valid query should return 200", async () => {
        const response = await request(app).get("/menu/1/price-history");
        
        
        expect(response.statusCode).toBe(200);
    });

    test("valid query should have more than 0 rows", async () => {
        const response = await request(app).get("/menu/1/price-history");
        
        expect(response.body.length).not.toBe(0);
    }); 

    test("drink that does not exist in database should return 404", async () => {
        const response = await request(app).get("/menu/3000/price-history");
        
        expect(response.statusCode).toBe(404);
    });
    
})