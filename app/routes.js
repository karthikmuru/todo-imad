module.exports = function(app){
    
    app.get('/',function(req,res){
   
        res.render('home-page');
    }); 
    /*app.post('/',function(req,res){
        
        //session = req.session;
        console.log(req.body.username);
        console.log(req.body.password);
        req.session.uniqueID = req.body.username;
        res.redirect('/redirect');
    });
    app.get('/redirect',function(req,res){
       
        console.log(req.session.uniqueID);
        res.render('home',{user: req.session.uniqueID});
    });
    app.get('/logout',function(req,res){
       
        req.session.destroy(function(err){
           
            console.log(err);
            res.redirect('/');
        });
    });
    */
};