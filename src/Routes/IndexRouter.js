const express = require("express");
const routes = express.Router();

const UserController = require('../controllers/UserController')
const TodoController = require('../controllers/TodoController')


const authMiddleware = require('../middleware/auth')

const Validations = require('../middleware/validations') 

// User Routes
routes.get('/users/:id', authMiddleware ,UserController.show)
routes.post('/users', Validations.createUser ,UserController.store)
routes.post('/users/login', Validations.login ,UserController.login)
// Todo Routes
routes.get('/todo/:id', authMiddleware, TodoController.findOne)
routes.get('/todo', authMiddleware , TodoController.showAll)
routes.get('/usertodo', authMiddleware , TodoController.showUserTasks)
routes.post('/todo', authMiddleware, Validations.createTask,  TodoController.store)
routes.put('/todo', authMiddleware, TodoController.modify)
routes.delete('/todo', authMiddleware, TodoController.delete)  

module.exports = routes