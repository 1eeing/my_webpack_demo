const path = require('path');
const NativeModule = require('module');
const vm = require('vm');
const axios = require('axios');
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');
const serverRender = require('./serverRender');
const MemoryFs = require('memory-fs');
const serverConfig = require('../../build/webpack.config.serve');

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/server.ejs')
            .then(res => {
                resolve(res.data);
            })
            .catch(reject);
    });
};

const getModuleFromString = (bundle, filename) => {
    const m = {exports: {}};
    const wrapper = NativeModule.wrap(bundle);
    const script = new vm.Script(wrapper, {
        filename,
        displayErrors: true
    });
    const result = script.runInThisContext();
    result.call(m.exports, m.exports, require, m);
    return m;
};

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
    const m = getModuleFromString(bundle, 'serverEntry.js');
	serverBoundle = m.exports;
});

module.exports = (app) => {
    app.use('/public', proxy({
        target: 'http://localhost:8888'
    }));

    app.get('*', (req, res, next) => {
        if(!serverBoundle){
            return res.send('waiting for compile...');
        }
        getTemplate().then(temp => {
            return serverRender(serverBoundle, temp, req, res);
        }).catch(next);
    });
};
