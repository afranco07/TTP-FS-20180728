const express = require('express');
const models = require('../models');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const AuthController = {
  registerRouter() {
    const router = express.Router();

    router.post('/login', this.loginUser);

    return router;
  },

  loginUser(req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
          info
        });
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        const token = jwt.sign(JSON.stringify(user), 'your_jwt_secret');
        return res.json({ user, token });
      });
    })(req, res);
  },
};


module.exports = AuthController.registerRouter();
