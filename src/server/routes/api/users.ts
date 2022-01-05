import express from 'express';
import authenticate from '../../../middlewares/authenticate';
import UserHandler from '../../../handlers/user';

const users: express.Router = express.Router();
const userHandler = new UserHandler();

// Index
users.get(
  '/',
  authenticate,
  (req, res) => { userHandler.index(req, res); }
);

// Show
users.get(
  '/:id',
  authenticate,
  (req, res) => { userHandler.show(req, res); }
);

// Create
users.post(
  '/',
  (req, res) => { userHandler.create(req, res); }
);

// Edit
users.put(
  '/:id',
  authenticate,
  (req, res) => { userHandler.edit(req, res); }
);

// Delete
users.delete(
  '/:id',
  authenticate,
  (req, res) => { userHandler.delete(req, res); }
);

export default users;
