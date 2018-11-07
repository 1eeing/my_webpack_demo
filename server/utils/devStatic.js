const path = require('path');
const axios = require('axios');
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');
const MemoryFs = require('memory-fs');

const ReactDomServer = require('react-dom/server');

const serverConfig = require('../../build/webpack.config.serve');

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data);
            })
            .catch(reject);
    });
};

const Module = module.constructor;

const mfs = new MemoryFs;
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBoundle;
serverCompiler.watch({}, (err, stats) => {
    if(err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(warn => console.warn(warn));

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    );

    const bundle = mfs.readFileSync(bundlePath, 'utf8');
    const m = new Module();
    m._compile(bundle, 'serverEntry.js');
    serverBoundle = m.exports.default;
}); 

module.exports = (app) => {

    app.use('/public', proxy({
        target: 'http://localhost:8888'
    }));

    app.get('*', (req, res) => {
        getTemplate().then(temp => {
            const content = ReactDomServer.renderToString(serverBoundle);
            res.send(temp.replace('<!-- app -->', content));
        }).catch(err => console.log(err));
    });
};
