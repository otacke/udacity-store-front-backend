import express from 'express';
import authenticate from '../../../middlewares/authenticate';
import OrderHandler from '../../../handlers/order';

const orders: express.Router = express.Router();
const orderHandler = new OrderHandler();

// Index
orders.get(
  '/',
  authenticate,
  (req, res) => { orderHandler.index(req, res); }
);

// Show
orders.get(
  '/:user_id',
  authenticate,
  (req, res) => { orderHandler.show(req, res); }
);

// Create
orders.post(
  '/',
  authenticate,
  (req, res) => { orderHandler.create(req, res); }
);

// Edit
orders.put(
  '/:id',
  authenticate,
  (req, res) => { orderHandler.edit(req, res); }
);

// Delete
orders.delete(
  '/:id',
  authenticate,
  (req, res) => { orderHandler.delete(req, res); }
);

export default orders;
