const request = require('supertest');
const chai = require('chai');  // Using Expect style
const {describe, it} = require('mocha');

const app = require('../../../index');


test("should return 200", async () => {
    const response = await request(app).get("/menu");
    
    expect(response.statusCode).toBe(200);
});

test("should not be empty rows", async () => {
    const response = await request(app).get("/menu");
    
    expect(response.body.length).not.toBe(0);
});