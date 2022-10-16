const request = require('supertest');
const chai = require('chai');  // Using Expect style
const app = require('../../../index');
const pool = require('../../../src/configs/db.config')

describe('GET /order/unfulfilled', () => { 
    test("valid query should return 200", async () => {
        const response = await request(app).get("/order/unfulfilled");
        
        expect(response.statusCode).toBe(200);
    });

    test("valid query should have more than 0 rows", async () => {
        const response = await request(app).get("/order/unfulfilled");
        
        expect(response.body.length).not.toBe(0);
    }); 
});

describe('PUT /order/complete-order/:orderId', () => {    
    test("valid query should return 200", async () => {
        const response = await request(app)
        .put("/order/complete-order/1")
        .set('Accept', 'application/json');        
        
        expect(response.statusCode).toBe(200);
    });

    test("valid query should return positive message", async () => {
        const response = await request(app).put("/order/complete-order/1");
        expect(response.body.message).toBe("completed order #1.");
    }); 

    test("order that does not exist in database should return 404", async () => {
        const response = await request(app).put("/order/complete-order/10000");
        
        expect(response.statusCode).toBe(404);
    });
})