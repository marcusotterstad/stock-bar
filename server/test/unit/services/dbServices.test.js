const { describe, it } = require('mocha');
const {assert} = require('chai')
const {getQuery} = require('../../../src/services/dbServices');


describe("Database Services", () => {

    describe("getQuery", () => {
        it("Throws an error when not given a correct query string", () => {
            const invalidQuery = "Invalid query";

            assert.throws(() => {getQuery(invalidQuery)})
        })
    })
})