const express = require('express');
const models = require('../models');
const passport = require('passport');

const UsersController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.getAllUsers);
    router.post('/', this.createUser);
    router.get('/:id', this.getUserByID);

    return router;
  },

  getAllUsers(req, res) {
    models.User.findAll({
      include: [{ model: models.Transaction }]
    })
    .then(allUsers => {
        res.json(allUsers);
    })
    .catch(console.error);
  },
  
  createUser(req, res) {
    models.User.create({
        email: req.body.email,
        password: req.body.password
    })
    .then( user => {
        res.send("User created successfully");
    })
    .catch( e => {
        res.send(400).send(e);
    })
  },

  getUserByID(req, res) {
    models.User.findById(req.params.id, {include: [{ model: models.Transaction }]})
    .then(user => {
      res.json(user);
    })
    .catch(console.error);
  },
};


module.exports = UsersController.registerRouter();
