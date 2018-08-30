// Update with your config settings.

let config = {
  host: 'database'
};
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'lfassignment',
      user: 'postgres',
      password: '',
      host: config.host
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'lf_migration'
    }
  },

};

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: config.host,
    user: 'postgres',
    password: ''
  }
});

knex.raw('CREATE DATABASE lfassignment IF NOT EXISTS;')