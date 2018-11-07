const path = require('path');
const fs = require('fs');
const express = require('express');
const ReactSSR = require('react-dom/server');

const isDev = process.env.NODE_ENV === 'development';

const app = express();

if(!isDev) {
    const serverEntry = require('../dist/serverEntry').default;
    const template = fs.readFileSync(path.join(__dirname, '../client/template.html'), 'utf8');
    app.use('/public', express.static(path.join(__dirname, '../dist')));

    app.get('*', (req, res) => {
        const appString = ReactSSR.renderToString(serverEntry);
        res.send(template.replace('<!-- app -->', appString));
    });
} else {
    const devStatic = require('./utils/devStatic');
    devStatic(app);
}

app.listen(3333, () => console.log('server is listening on 3333'));