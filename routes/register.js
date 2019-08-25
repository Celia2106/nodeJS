var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register', { register: 'Registro',login:'Login' });
});


module.exports = router;

