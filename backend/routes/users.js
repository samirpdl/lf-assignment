var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexconfig'))
var auth = require('../services/auth');
var bcrypt = require('bcrypt-nodejs');

/* GET users listing. */
router.post('/login', function (req, res, next) {
  let { email, password } = req.body
  knex('users').where({
    email: email,
  }).then((user) => {
    bcrypt.compare(password, user[0].password, function (err, resp) {
      if (!err) {
        res.status(200)
          .json({
            success: true,
            token: auth.createJWToken({
              sessionData: user,
              maxAge: 3600
            })
          })
      } else {
        res.status(401)
          .json({
            message: "Sorry your password doesn't match"
          })
      }
    });
  }).catch((err) => {
    res.status(401)
      .json({
        message: err + "Validation failed. Given email and password aren't matching."
      })
  })
});

router.post('/refresh', function (req, res, next) {
  let token = req.get('token');
  auth.refreshToken(token, res)
})

module.exports = router;
