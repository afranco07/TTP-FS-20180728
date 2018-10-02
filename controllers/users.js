const express = require('express');
const models = require('../models');

const UsersController = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.getAllUsers);
    router.post('/', this.createUser);

    return router;
  },

  getAllUsers(req, res) {
    models.User.findAll()
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
};


module.exports = UsersController.registerRouter();
