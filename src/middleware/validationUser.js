const { check } = require("express-validator");

const ValidationsUser = {
  createUser: [
    check("name", "Entry your name").not().isEmpty(),
    check("email", "Entry valid email").isEmail(),
    check("password", "Password must contain 6 characters").isLength({min: 6})
  ]
}

module.exports = ValidationsUser;