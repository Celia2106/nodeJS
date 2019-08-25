var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //pendiente de recoger user de BD
    res.render('delete', { variables: [{"user":"celia"},{"user":"paco"}]});
});

module.exports = router;