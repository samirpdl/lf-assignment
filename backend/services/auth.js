const jwt = require('jsonwebtoken');
const _ = require('lodash');
module.exports = {
    createJWToken(details) {
        if (typeof details !== 'object') {
            details = {}
        }

        if (!details.maxAge || typeof details.maxAge !== 'number') {
            details.maxAge = 300
        }

        details.sessionData = _.reduce(details.sessionData || {}, (memo, val, key) => {
            if (typeof val !== "function" && key !== "password") {
                memo[key] = val
            }
            return memo
        }, {})

        process.env.JWT_SECRET = "lfassignment";

        let token = jwt.sign({
            data: details.sessionData
        }, process.env.JWT_SECRET, {
                expiresIn: details.maxAge,
                algorithm: 'HS256'
            })

        return token
    },
    refreshToken(token, res) {
        jwt.verify(token, 'lfassignment', function (err, payload) {
            if (err) {
                return res.status(401)
                    .json({
                        success: false,
                        message: "Invalid Token"
                    });
            }
            delete payload.iat;
            delete payload.exp;
            delete payload.nbf;
            delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
            const jwtSignOptions = {
                expiresIn: 300,
                algorithm: 'HS256'
            }
            // The first signing converted all needed options into claims, they are already in the payload
            return res.status(200)
                .json({
                    success: true,
                    token: jwt.sign(payload, "lfassignment", jwtSignOptions)
                });
        });

    }
}