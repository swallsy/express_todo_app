const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

var html = '<form action="/" method="post">' +
            '<input type="text" name="addItem" placeholder="Add a todo..." />' +
            '<button type="submit">Submit</button>' +
    '</form>';

app.get('/', function (req, res) {
      res.send(html);
  });

  app.post('/', function (req, res) {

    req.checkBody("addItem", "You can't submit a blank to do item! Please use your words.").notEmpty();
    var errors = req.validationErrors();
    if (errors) {

      res.render('error', {errors: errors});

    } else {
        var addItem = req.body.addItem;
        let newToDoItem = addItem.textContent;
        html += '<li style="list-style-type: none;">' + '<input name="toDoItem" type="checkbox">' + '<label name="toDoItem"></label>' + addItem + '</li>';
        res.send(html);
      }
  });

app.listen(3000, function (){
  console.log("Started express application!");
});
