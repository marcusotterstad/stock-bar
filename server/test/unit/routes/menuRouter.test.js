const request = require('supertest');
const chai = require('chai');  // Using Expect style
const pool = require('../../../src/configs/db.config')

const app = require('../../../index');
const { expect } = require('chai');

describe('/menu router', () => { 

    // GET full menu
    describe('GET /menu', () => { 
        test("should return 200", async () => {
            const response = await request(app).get("/menu");
            
            expect(response.statusCode).equal(200);
        });

        test("should have more than 0 rows", async () => {
            const response = await request(app).get("/menu");
            
            expect(response.body.length).not.equal(0);
        }); 
    });


    // GET info of a single dirnk
    describe('GET /menu/:drink-id/', () => {
        test("valid query should return 200", async () => {
            const response = await request(app).get("/menu/1/");

            expect(response.statusCode).equal(200);
        });

        test("valid query should have more than 0 rows", async () => {
            const response = await request(app).get("/menu/1/");
            
            expect(response.body.length).not.equal(0);
        }); 

        test("drink that does not exist in database should return status code 404", async () => {
            const response = await request(app).get("/menu/3000/");
            
            expect(response.statusCode).equal(404);
        });

        test("non-integer should return status code 400", async () => {
            const response = await request(app).get("/menu/a/");
            
            expect(response.statusCode).equal(400);
        });

    })


    // GET price of single drink
    describe('GET /menu/:drink_id/price/', () => {

        test("valid query should return 200", async () => {
            const response = await request(app).get("/menu/1/price");        
            
            expect(response.statusCode).equal(200);
        });

        test("drink that is not in menu should return 404", async () => {
            const response = await request(app).get("/menu/3000/price");        

            expect(response.statusCode).equal(404);
        });

        test("price should not be 0", async () => {
            const response = await request(app).get("/menu/1/price");        

            expect(response.body.price).not.equal(0);
        });
    });


});