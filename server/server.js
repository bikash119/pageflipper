var requirejs = require('requirejs');
var express = require('express');
var app = express();

app.configure(function(){
	app.use(express.logger());
    app.set('view engine', 'jade');
    app.set('view options', { doctype:'html', pretty:true, layout:false });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static('../'));

    app.use(express.static('static'));
    app.engine('html', require('ejs').renderFile);

});

app.get('/',function(req,res){
	app.set('views', './');
	res.render('index.html');
});

app.get('/home',function(req,res){
    app.set('views','./');
    res.render('home.html');
});

app.get('/pageflip',function(req,res){
    app.set('views','./');
    res.render('pageflip.html');
});

app.get('/colorbookflip',function(req,res){
    app.set('views','./');
    res.render('colorbookflip.html');
});

app.get('/curve',function(req,res){
    app.set('views','./');
    res.render('curve.html')
});

app.get('/rectanim',function(req,res){
    app.set('views','./');
    res.render('movingRect.html')
});

app.listen(3434,function(){
	console.log( " Color book ");
	console.log( " connect using http://localhost:3434");
});