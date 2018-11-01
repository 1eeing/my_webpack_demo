const path = require('path');
const fs = require('fs');
const express = require('express');
const ReactSSR = require('react-dom/server');
const serverEnter = require('../dist/serverEntry').default;

const template = fs.readFileSync(path.join(__dirname, '../client/template.html'), 'utf8');

const app = express();

app.use('/public', express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
    const appString = ReactSSR.renderToString(serverEnter);
    res.send(template.replace('<app></app>', appString));
});

app.listen(3333, () => console.log('server is listening on 3333'));