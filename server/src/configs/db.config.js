const config = {
  user: 'marcus',
  host: 'localhost',
  database: 'api_drinks',
  password: 'password',
  port: 5432
}
const {Pool} = require('pg');
const pool = new Pool(config);


module.exports = pool;