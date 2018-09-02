
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {id: 1, name: 'Product 1', rate: 2},
        {id: 2, name: 'Product 2', rate: 2},
        {id: 3, name: 'Product 3', rate: 2}
      ]);
    });
};
