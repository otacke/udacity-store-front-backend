import express from 'express';
import authenticate from '../../../middlewares/authenticate';
import ProductHandler from '../../../handlers/product';

const products: express.Router = express.Router();
const productHandler = new ProductHandler();

// Index
products.get(
  '/',
  (req, res) => { productHandler.index(req, res); }
);

// Show
products.get(
  '/:id',
  (req, res) => { productHandler.show(req, res); }
);

// Create
products.post(
  '/',
  authenticate,
  (req, res) => { productHandler.create(req, res); }
);

// Edit
products.post(
  '/:id',
  authenticate,
  (req, res) => { productHandler.edit(req, res); });

// Delete
products.delete(
  '/:id',
  authenticate, (req, res) => { productHandler.delete(req, res); }
);

export default products;
