const express = require("express");
const routes = express.Router();

const UserController = require('../controllers/UserController')
const TodoController = require('../controllers/TodoController')


const authMiddleware = require('../middleware/auth')

const Validations = require('../middleware/validations') 

// User Routes
routes.get('/users/:id', authMiddleware ,UserController.show)
routes.post('/users', Validations.createUser ,UserController.store)
// Todo Routes
routes.get('/todo/:id', authMiddleware, TodoController.findOne)
routes.get('/todo', authMiddleware , TodoController.showAll)
routes.post('/todo', authMiddleware, Validations.createTask,  TodoController.store)
routes.put('/todo/:id', authMiddleware, TodoController.modify)
routes.delete('/todo/:id', authMiddleware, TodoController.delete)  

module.exports = routes