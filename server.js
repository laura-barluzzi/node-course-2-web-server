const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middlewares
// they are called in order
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n');
    next();
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send("<h1>Hello Express</h1>");
    res.render('home.hbs', {
        pageTitle: 'About page',
        welcomeMessage: 'Hi there! Welcome to my website :)'
    })
    
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Error handling /bad page."
    });
});

app.listen(port, () => {
    console.log(`Listening to post ${port}`);
});