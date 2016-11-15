var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false });
var mongoose = require("mongoose");

mongoose.connect('mongodb://test:test@ds139327.mlab.com:39327/todo');

//Create schema
var todoSchema = new mongoose.Schema({
    username: String,
    item: String
});

var todo = mongoose.model('todo',todoSchema);

module.exports = function(app){
    
    app.get('/',function(req,res){
   
        res.render('home-page');
    }); 
    app.post('/',parser,function(req,res){
        
        //session = req.session;
        console.log(req.body.username);
        console.log(req.body.password);
        req.session.uniqueID = req.body.username;
        res.redirect('/redirect');
    });
    app.get('/redirect',function(req,res){
       
        console.log("rediect : " + req.session.uniqueID);
        res.redirect('/profile');
        //res.render('home',{user: req.session.uniqueID});
    });
    app.get('/profile',function(req,res){
       
        todo.find({username: req.session.uniqueID},function(err,data){
           
            res.render('profile',{todo:data , user:req.session.uniqueID});
        });
        
        //res.render('profile',{user: req.session.uniqueID});
        
    });
    app.get('/logout',function(req,res){
       
        req.session.destroy(function(err){
           
            console.log(err);
            res.redirect('/');
        });
    });
    
    
};