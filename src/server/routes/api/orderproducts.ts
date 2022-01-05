import express from 'express';
import authenticate from '../../../middlewares/authenticate';
import OrderProductHandler from '../../../handlers/orderProduct';

const orderProducts: express.Router = express.Router();
const orderProductHandler = new OrderProductHandler();

// Index
orderProducts.get(
  '/',
  authenticate,
  (req, res) => { orderProductHandler.index(req, res); });

// Show
orderProducts.get(
  '/:id',
  authenticate,
  (req, res) => { orderProductHandler.show(req, res); });

// Create
orderProducts.post(
  '/',
  authenticate,
  (req, res) => { orderProductHandler.create(req, res); });

// Edit
orderProducts.put(
  '/:id',
  authenticate, (req, res) => { orderProductHandler.edit(req, res); });

// Delete
orderProducts.delete(
  '/:id',
  authenticate, (req, res) => { orderProductHandler.delete(req, res); });

export default orderProducts;
