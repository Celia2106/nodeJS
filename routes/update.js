var express = require('express');
var router = express.Router();

router.get('/update',function(req, res, next){
    res.render('update', { title: 'Actualización Usuarios'});
});

module.exports = router;