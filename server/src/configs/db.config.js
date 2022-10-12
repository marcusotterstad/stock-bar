const config = {
  user: 'postgres',
  host: 'tc4.otterstad.name',
  database: 'drinks',
  password: 'EE4yQ8H28NmM',
  port: 45678
}
const {Pool} = require('pg');
const pool = new Pool(config);

module.exports = pool;
