const Order = require('../models/order-model');

class OrderController {
  async putOrderToDb(req, res) {
    try {
      const {
        name,
        phone,
        city,
        adressOfTheProvence,
        adressOfTheUser,
        methodOfPayment,
        comment,
        dishes,
        totalPrice,
      } = req.body;
      const order = new Order(
        name,
        phone,
        city,
        adressOfTheProvence,
        adressOfTheUser,
        methodOfPayment,
        comment,
        dishes,
        totalPrice
      );
      const savedOrder = await order.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new OrderController();
