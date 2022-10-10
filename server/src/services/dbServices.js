const pool = require('../configs/db.config');

// A middleware function for all GET queries. This is to follow the DRY code principle, and make the code simpler to read. It's also easy to add new GET queries using this function.
const getQuery = (queryString) => {

    // returns a callback express function used for routing
    return (req, res, next) => {
        pool.query(queryString, (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(results.rows);
        })
    }

}


module.exports = {
    getQuery
}