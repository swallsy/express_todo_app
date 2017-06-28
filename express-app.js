const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const models = require('./models');
const sequelize = require('sequelize');
// const views = require('./views');

const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());


app.get('/', function (req, res) {
  models.todos.findAll().then(function(todos) {
    res.render('index', {todos: todos});
  })
});

app.post("/", function (req, res) {
  var newitem = models.todos.build({
    todo: req.body.todo,
    priority: req.body.priority
  })
  newitem.save().then(function (newTodo) {
    res.redirect('/');
  })
});

//

  // app.post('/', function (req, res) {
  //
  //   req.checkBody("addItem", "You can't submit a blank to do item! Please use your words.").notEmpty();
  //   var errors = req.validationErrors();
  //   if (errors) {
  //
  //     res.render('error', {errors: errors});
  //
  //   } else {
  //       var addItem = req.body.addItem;
  //       let newToDoItem = addItem.textContent;
  //       html += '<li style="list-style-type: none;">' + '<input name="toDoItem" type="checkbox">' + '<label name="toDoItem"></label>' + addItem + '</li>';
  //       res.send(html);
  //     }
  // });

app.listen(3000, function (){
  console.log("Started express application!");
});
