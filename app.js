const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = require('./routes');
const database = require('./connection');

const indexRouter = require('./routes/index');
const registerRouter  = require('./routes/register');
const loginRouter  = require('./routes/login');
const resultRouter   = require('./routes/resultado');
const updateRouter   = require('./routes/update');
const deleteRouter   = require('./routes/delete');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/resultado', resultRouter);
app.use('/update', updateRouter);
app.use('/delete', deleteRouter);
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});
router.post('/saveform', function (req, res) {
  const name = req.body.name;
  const pass = req.body.pass;
  const access = req.body.typeUser;
  console.log(name,pass,access);

  database.query('INSERT INTO users(name,pass,accesslevel) VALUES($1, $2,$3)', [name,pass,access]);


  //no recordo como coger estado query
  let result = true;
  if (result) {
    res.render('resultado', {contenido: {'status':"OK","result":"Usuario creado"}});
  }
  else {
    res.render('resultado', {contenido: {'status':"KO","result":"Error al crear el Usuario"}});
  }
});

router.post('/savelogin', function (req, res) {
  const name = req.body.name;
  const pass = req.body.pass;

  database.query("SELECT id,name,pass from users where name=$1 and pass=$2 RETURNING id", [name,pass],checkLogin);
  res.render('resultado', {contenido: {'status':"OK","result":"Usuario correcto"}});
});
router.get('/updateuser',function(req, res, next){
  const name = req.body.name;
  const pass = req.body.pass;
  const access = req.body.typeUser;
  console.log(name,pass,access);

  database.query('update users set name=$1,pass=$2,accesslevel=$3 where name=$1', [name,pass,access]);
  res.render('resultado', {contenido: {'status':"OK","result":"Usuario correcto"}});
});
router.post('/deleteuser', function (req, res) {
  const name = req.body.name;

  database.query("delete from users where name=$1", [name],checkDelete);

});
function checkLogin(datos){
  if(datos.result.length>1){
    //login realizado
  }else
    res.render('resultado', {contenido: {'status':"KO","result":"Usuario incorrecto"}});

}
function checkDelete(datos){
  if(datos.result.length>0){
    res.render('resultado', {contenido: {'status':"OK","result":"Usuario Eliminado"}});
  }else
    res.render('resultado', {contenido: {'status':"KO","result":"Usuario no Eliminado"}});

}

module.exports = app;
