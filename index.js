const express = require('express');
const path = require('path');
const XMLHttpRequest = require('xhr2');

const telegramToken = '6642011761:AAFxn0x2Es5w-5bcNTikp2lkiMue3zGJrfM';

const app = express();
const port = process.env.PORT || 8080;

app.use('/robots.txt', express.static(`${__dirname}/robots.txt`));
app.use('/Sitemap.txt', express.static(`${__dirname}/Sitemap.txt`));
app.use('/favicon.ico', express.static(`${__dirname}/frontend/img/favicon/favicon.ico`));
app.use('/img', express.static(`${__dirname}/frontend/img`));
app.use('/css', express.static(`${__dirname}/frontend/css`));
app.use('/js', express.static(`${__dirname}/frontend/js`));
app.use('/webfonts', express.static(`${__dirname}/frontend/webfonts`));

app.use("/index", (req, res) => {
    res.redirect('/');
})

app.get("/", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname,'./frontend/index.html'));
})

app.get("/portfolio", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname,'./frontend/portfolio.html'));
})

app.get("/contacts", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname,'./frontend/contacts.html'));
})

app.get("/prices", (req, res) => {
    return res.status(200).sendFile(path.join(__dirname,'./frontend/prices.html'));
})

app.use(express.json());

/*
app.get('/api/callback', (req, res) => {
    return res.status(200).send(orders);
})
*/

async function telegram (req) {
    let message = [];
    for (key in req.body) {
        message.push(`${key} - ${req.body[key]}\n`);
    };
    message = message.join(" ");
    let url = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=6407769347&text=`
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", encodeURI(url+message), true);
    xhttp.send();
    }

app.post('/api/callback', async (req, res) => {
    telegram(req);
    return res.status(200).send({message: "We will call you"});
});


app.listen(port, '127.0.0.1');
console.log('Server started at http://localhost:' + port);
