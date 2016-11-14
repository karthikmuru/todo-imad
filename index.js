var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.set('port', (process.env.PORT || 5000));
app.set('view engine','ejs');


mongoose.connect('mongodb://test:test@ds139327.mlab.com:39327/todo');

//Create schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo',todoSchema);

var item = Todo({item:'buy flowers'}).save(function(err){

    console.log(err);
});

require('./app/routes.js')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});