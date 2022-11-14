const { Router } = require('express'),
router = Router(),
joi = require('joi'),
validator = require('express-joi-validation').createValidator({}),
{ registerUser, loginUser, getInfoUser } = require('../controllers/user.controller'),
userAuth = require('../middlewares/userAuth');

const registerSchema = joi.object({
  name: joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .min(1)
    .max(40)
    .required(),
  email: joi.string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  password: joi.string().required(),
  confirmPassword: joi.string().required(),

  lastName: joi.string()
    .regex(/^[a-zA-Z\s]+$/)
    .min(1)
    .max(40)
    .required(),
});
const loginSchema = joi.object({
  email: joi.string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  password: joi.string().required()
});


router.post('/register', validator.body(registerSchema), registerUser);
router.post('/login', validator.body(loginSchema), loginUser);
router.get('/profile', userAuth, getInfoUser);



module.exports = router;