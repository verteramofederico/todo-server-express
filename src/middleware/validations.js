const { check } = require("express-validator");

const Validations = {
  createUser: [
    check("name", "Entry your name").not().isEmpty(),
    check("email", "Entry valid email").isEmail(),
    check("password", "Password must contain 6 characters").isLength({min: 6})
  ],
  createTask: [
    check("user_id", "You must be logged").not().isEmpty(),
    check("title", "You must enter a title").not().isEmpty(),
  ]
}

module.exports = Validations;