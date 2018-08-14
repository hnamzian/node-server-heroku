const express = require('express');
const fs = require('fs');
const hbs =require('hbs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var log = `${new Date().toString()}, ${req.method}, ${req.url} \n`;
    fs.appendFile('server.log', log, (err) => {
        if (err) {
            console.log(err);
        }
    })
    console.log(log);
    next();
})

app.use((req, res, next) => {
    res.render('maintenance.hbs');
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to web page',
    });
})

app.use(express.static(__dirname + '/public'));

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page!',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMsg: 'Bad Request!'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});