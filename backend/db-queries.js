var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres@database/lfassignment';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllProducts: getAllProducts,
  getSingleProduct: getSingleProduct,
  createProduct: createProduct,
  updateProduct: updateProduct,
  removeProduct: removeProduct
};


function getAllProducts(req, res, next) {
  db.any('select * from products')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleProduct(req, res, next) {
  var productID = parseInt(req.params.id);
  db.one('select * from products where id = $1', productID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createProduct(req, res, next) {
  db.none('insert into products(name, rate)' +
      'values(${name}, ${rate})',
    req.body)
    .then(function () {
      res.status(201)
        .json({
          status: 'success',
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateProduct(req, res, next) {
  db.none('update products set name=$1, rate=$2 where id=$3',
    [req.body.name, req.body.rate, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeProduct(req, res, next) {
  var productId = parseInt(req.params.id);
  db.result('delete from products where id = $1', productId)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
        });
    })
    .catch(function (err) {
      return next(err);
    });
}