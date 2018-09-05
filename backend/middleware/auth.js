var express = require('express');
var auth = require('../services/auth');
const jwt = require('jsonwebtoken');
module.exports = {
    verifyTokenOnAPICall(req, res, next) {
        let token = req.get('token');
        jwt.verify(token, 'lfassignment', function (err, payload) {
            if (err) {
                res.status(401)
                    .json({
                        success: false,
                        message: "Invalid Token provided"
                    });
            } else {
                req.user = payload.data;
                next();
            }

        });
    }

}