const request = require('supertest');
const {describe, it} = require('mocha');
const app = require('../../../index');

describe('Orders Router', () => {
    it('GET all orders', (done) => {
        request(app)
        .get('/orders/')
        .expect(200, done)
    })

    it('GET unfulfilled orders', (done) => {
        request(app)
        .get('/orders/unfulfilled')
        .expect(200, done)
    })

    it('GET total price of orders', (done) => {
        request(app)
        .get('/orders/totals')
        .expect(200, done)
    })

})