var express = require('express');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false });
var mongoose = require("mongoose");
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;



var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('view engine','ejs');

//express-session
app.use(expressSession({
    
    secret: '123456789QWERTY',
    resave: false,
    saveUninitialized: false
    
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

//passport Use
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static('./views'));

// --



mongoose.connect('mongodb://test:test@ds139327.mlab.com:39327/todo');

//Create schema
var todoSchema = new mongoose.Schema({
    username: String,
    item: String
});
var accSchema = new mongoose.Schema({
   
    username:String,
    email:String,
    password:String
    
});

var account = mongoose.model('account',accSchema);
var todo = mongoose.model('todo',todoSchema);
    
passport.use(new passportLocal(function(username,password,done){
        
    account.find({username:username,password:password},function(err,data){
        
        if(err) throw err;
        if(data.length == 1) done(null,{id:data});
        else done(null,null);
    });        
 }));
  
passport.serializeUser(function(id, done){
   
      //console.log("Serialize");
        done(id.username);
 });
    
passport.deserializeUser(function(id, done){
       
    /*account.find({username:id},function(err,data){
        
        if(err) throw err;
        if(data.length == 1)
        {
            done(null,{user:id});   
        }
        else
            done(null,null);
        
                        
    });*/
     //console.log("Deserialize");
    done(null,{user:id});
});

app.get('/',function(req,res){
    
    res.render('home-page');
    /*
    reference
    var item = todo({username:"richard",item:"kick some coding ass"}).save(function(err,data){
        if(err) 
            res.redirect('/profile');
        });*/
   
   /*
   reference
   todo.find({username:"karthik"},function(err,data){
        
        if(err) throw err;
        res.render('sample',{data:data});
     });
     */
    
}); 

app.post('/',passport.authenticate('local',{ successRedirect: '/profile',failureRedirect: '/'}),function(req,res){
    
    //res.render('signup');
    /*account.find({username:"karthikmuru"},function(err,data){
        
        if(err) throw err;
        res.render('sample',{data:data});
     });*/
 });

app.get('/profile',function(req,res){
       
    //console.log(req.id);
    if(req.isAuthenticated() != true)
        res.render('/');
    else{
        
        todo.find({username:req.user},function(err,data){
            
            if(err)
               console.log(err);    
            else
                res.render('profile',{todo:data , user:req.user});
        });
         /*res.render('profile',{
            isAuthenticated: req.isAuthenticated(),
            user:req.user
            });*/
    }
       
    
    
    //res.render('profile',{user: req.session.uniqueID});
        
});
    
app.post('/profile',parser,function(req,res){
       
    var item = todo(req.body).save(function(err,data){
        if(err) throw err;
            res.redirect('/profile');
        });
       /* todo.insert({username: req.session.uniqueID, item:req.body},function(err){
            if(err) throw err;
            res.redirect('/profile');
        });*/
        
});
    
app.get('/signup',function(req,res){
       
    res.render('signup');
        
});
app.post('/signup',parser,function(req,res){
       
    var item = new account({username:req.body.username,email:req.body.email,password:req.body.password}).save(function(err,data){
        if(err) throw err;
        res.redirect('/');           
    }); 
});
    
app.get('/logout',function(req,res){
       
    req.session.destroy(function(err){
           
        console.log(err);
        res.redirect('/');
    });
});

// --

app.get('/css/styles.css', function (req, res) {
  res.sendFile(path.join(__dirname,'css', 'styles.css'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});