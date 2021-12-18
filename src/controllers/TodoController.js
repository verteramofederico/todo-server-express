const Sequelize = require("sequelize");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const db = require('../../database/models')

let Task = db.Task // model

module.exports = {
    async findOne (req, res) {
        const {id} = req.params

        const task = await Task.findOne({ where: { id }})
    
        if (!task) {return res.status(404).send({message: 'there is no task'})}

        return res.status(200).json(task)
    },
    async showAll (req, res) {
        const task = await Task.findAll()
        if (!task) {return res.status(404).send({message: 'there is not task'})}

        return res.status(200).json(task)
    },
    async showUserTasks (req, res) {
        let user_id = req.userId
        const task = await Task.findAll({where: { user_id: user_id}})
        if (!task) {return res.status(404).send({message: 'there is not task'})}

        return res.status(200).json(task)
    },
    async store (req, res) {
        const {user_id, title} = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const task = await Task.create({
            user_id,
            title
        })

        return res.status(201).json(task)
    },
    async modify (req, res) {
        const {id} = req.body

        const taskToModify = await Task.findOne({ where: { id: id  }})
        taskToModify.completed === 0 ? taskToModify.completed = 1 : taskToModify.completed = 0
        await taskToModify.save()

        return res.status(201).json(taskToModify)

    },
    async delete (req, res) {
        const {id} = req.body

        const taskToDelete = await Task.destroy({ where: { id: id }})
        return res.status(204).json(taskToDelete)
        
    }
}