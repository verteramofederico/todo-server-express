const Sequelize = require("sequelize");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// To hast password
const bcryptjs = require('bcryptjs');

const db = require('../../database/models')

let User = db.User // model

module.exports = {
    async show (req, res) {
        const {id} = req.params

        const user = await User.findOne({ where: { id },
            attributes: {
                exclude: ["password", "updatedAt"]
                }
            })
    
        if (!user) {return res.status(404).send({message: 'can not find the user'})}

        return res.status(200).json(user)
    },
    async store(req, res) {
        const {name, email, password} = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user = await User.findOne({
            where: { [Sequelize.Op.or]: [{ email }] }
        })

        if (user) {
            if (user.email === email)
                return res.status(400).json({ message: "Email already registered" });
        }

        // hash passwordHash
        const salt = await bcryptjs.genSalt(10);
        const passwordHashed = await bcryptjs.hash(password, salt)
        
        user = await User.create({
            name, 
            email, 
            password: passwordHashed
        })

        // jwt
        const payload = { id: user.id, email: user.email };
        jwt.sign(
            payload,
            process.env.SIGNATURE_TOKEN,
            { expiresIn: 86400 },
            (error, token) => {
                if (error) {throw error};
                return res.status(201).json({ token, name: user.name });
            }
        )
    },
    async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
        }
    
        const { email, password } = req.body;
    
        let user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).send({ message: "User not founded" });
    
        const verifyPass = await bcryptjs.compare(password, user.password);
        if (!verifyPass)
        return res.status(400).send({ message: "Incorrect password or email" });
    
        //JWT
        const payload = { id: user.id, email: user.email };
        jwt.sign(
            payload,
            process.env.SIGNATURE_TOKEN,
            { expiresIn: 86400 },
            (error, token) => {
                if (error) throw error;
                return res.status(201).json({ token, name: user.name });
            }
        )
    }
}