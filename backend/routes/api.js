var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexconfig'))

router.get('/products', getAllProducts);
router.get('/products/:id', getSingleProduct);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', removeProduct);



function getAllProducts(req, res, next) {
    knex('products').then((products) => {
        return res.status(200)
            .json({
                status: 'success',
                data: products,
            });
    }).catch(function (err) {
        return next(err);
    });
}

function getSingleProduct(req, res, next) {
    var productID = parseInt(req.params.id);
    knex('products').where('id', productID).then((product) => {
        return res.status(200)
            .json({
                status: 'success',
                data: product,
            });
    }).catch(function (err) {
        return next(err);
    });
}

function createProduct(req, res, next) {
    knex('products').insert({ name: req.body.name, rate: req.body.rate })
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
    knex('products').where('id', parseInt(req.params.id))
        .update({ name: req.body.name, rate: req.body.rate })
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
    knex('products').where('id', parseInt(req.params.id))
        .del()
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


module.exports = router;