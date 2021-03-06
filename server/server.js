const path = require('path');
const fs = require('fs');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const serverRender = require('./utils/serverRender');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
	maxAge: 10 * 60 * 1000,
	name: 'tid',
	resave: false,
	saveUninitialized: false,
	secret: 'secretCode'
}));

app.use(favicon(path.join(__dirname, '../favicon.ico')));

app.use('/api/user', require('./utils/loginIn'));
app.use('/api', require('./utils/proxy'));

if(!isDev) {
    const serverEntry = require('../dist/serverEntry');
    const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf8');
    app.use('/public', express.static(path.join(__dirname, '../dist')));

    app.get('*', (req, res, next) => {
        serverRender(serverEntry, template, req, res).catch(next);
    });
} else {
    const devStatic = require('./utils/devStatic');
    devStatic(app);
}

app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send(err);
});

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || '3333';

app.listen(PORT, HOST, () => console.log(`server is listening on ${HOST}:${PORT}`));
