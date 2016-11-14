var express = require('express');
/*var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var pg = require('pg');

app.use(bodyParser);
app.use(bodyParser.urlencoded({extended: false }));*/
var app = express();
app.set('view engine','ejs');
/*app.use(expressSession({
    
    secret: '123456789',
    resave: false,
    saveUninitialized: false
    
}));*/

require('./app/routes.js')(app);
console.log("listening to port 3000");
app.listen(3000);