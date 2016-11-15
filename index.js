var express = require('express');

var mongoose = require('mongoose');
var expressSession = require('express-session');



var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('view engine','ejs');

app.use(expressSession({
    
    secret: '123456789QWERTY',
    resave: false,
    saveUninitialized: false
    
}));

app.use(express.static('./views'));
app.get('/css/styles.css', function (req, res) {
  res.sendFile(path.join(__dirname,'css', 'styles.css'));
});
require('./app/routes.js')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});