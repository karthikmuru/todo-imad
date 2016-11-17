var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: false });
var mongoose = require("mongoose");
var passport = require('passport');
var passportLocal = require('passport-local').Strategy;

/*mongoose.connect('mongodb://test:test@ds139327.mlab.com:39327/todo');

//Create schema
var todoSchema = new mongoose.Schema({
    username: String,
    item: String
});
var accSchema = new mongoose.Schema({
   
    username:String,
    password:String,
    email:String
    
});

var account = mongoose.model('account',accSchema);
var todo = mongoose.model('todo',todoSchema);
*/

module.exports = function(app){

    //passport Use
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new passportLocal(function(username,password,data){
        
        /*account.find({username:username,password:password},function(err,data){
            
            if(data.length == 1)
                done(null,{id:data._id,user:username});
            else
                done(null,null);
        });*/
        console.log("Strategy");
        if(username === password)
            done(null,{id:username , user:username});
        else
            done(null,null);
        
    }));
    
   /* passport.serializeUser(function(user, done){
       
        console.log("Serialize");
        done(user.id);
    });
    
    passport.deserializeUser(function(id, done){
       
        /*account.findById(id,function(err,data){
           
            done({id:id, user:data.username});
                        
        });
        console.log("Deserialize");
        done({id:id});
    });
    */
    app.get('/',function(req,res){
   
        res.render('home-page');
    }); 
    app.post('/',passport.authenticate('local'),function(req,res){
        
        //session = req.session;
        /*console.log(req.body.username);
        console.log(req.body.password);*/
        //req.session.uniqueID = req.body.username;
        res.redirect('/profile');
    });

    app.get('/profile',function(req,res){
       
        console.log(req.id);
        /*if(req.isAuthenticated() != true)
            res.render('/');
        else{
             res.render('profile',{
                isAuthenticated: req.isAuthenticated(),
                user:req.user
             });
        }*/
       
        /*todo.find({username: req.session.uniqueID},function(err,data){
            
            if(err)
                console.log(err);    
            else
                res.render('profile',{todo:data.item , user:req.session.uniqueID});
        });
        */
        //res.render('profile',{user: req.session.uniqueID});
        
    });
    
    app.post('/profile',parser,function(req,res){
       
        var item = todo(req.body).save(function(err,data){
            if(err) throw err;
            res.redirect('/profile');
        })
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
    
    
};