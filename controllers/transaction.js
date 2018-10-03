const express = require('express');
const models = require('../models');

const TransactionController = {
  registerRouter() {
    const router = express.Router();

    router.post('/', this.createTransaction);

    return router;
  },
  
  createTransaction(req, res) {
    models.Transaction.create({
        UserId: req.body.userid,
        ticker: req.body.ticker,
        price: req.body.price,
        quantity: req.body.quantity
    })
    .then( trans => {
        return models.User.findById(req.body.userid)
        res.send("Transaction created successfully");
    })
    .then(user => {
      return user.decrement('balance', {by: req.body.price })
    })
    .then( () => res.send("Transaction created successfully"))
    .catch( e => {
        res.send(400).send(e);
    })
  },
};


module.exports = TransactionController.registerRouter();
