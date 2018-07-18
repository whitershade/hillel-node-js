const { Router } = require('express');
const passport = require('passport');
const validation = require('./validation');
const ctrl = require('./controller');
const mdl = require('../middlewares');


const router = Router();

router
  .post('/', mdl.validate(validation.register), ctrl.registerNewUser)
  .post('/login', passport.authenticate('local', {}), ctrl.login);


module.exports = router;
