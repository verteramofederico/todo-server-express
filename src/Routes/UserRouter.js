const express = require("express");
const routes = express.Router();

const UserController = require('../controllers/UserController')

const authMiddleware = require('../middleware/auth')

const ValidationsUser = require('../middleware/validationUser') 

routes.get('/users/:id', authMiddleware ,UserController.show)
routes.post('/users', ValidationsUser.createUser ,UserController.store)


module.exports = routes