var bcrypt = require('bcrypt-nodejs');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return knex('users').insert(
        { id: 1, name: "Sameer Poudel", email: 'samir@samirpdl.com.np', password: bcrypt.hashSync("samir") },
      );
    });
};
