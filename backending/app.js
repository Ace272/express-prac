const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://elsan:querynomo@cluster0.19vu2lh.mongodb.net/nodening?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewURLParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(morgan('dev'));

//routes
app.get('/', (req,res) => {
    res.redirect('/blogs');
});

app.get('/about',(req,res) => {
    // res.send('The about page');
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: 'About'})
});

//blog routes
app.get('/blogs', (req,res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index' ,{title: 'All Blogs', blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/blogs/create', (req,res) => {
    res.render('create', {title: 'create'});
});

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});
