const path = require('path');
const axios = require('axios');
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');
const serialize = require('serialize-javascript');
const MemoryFs = require('memory-fs');
const ejs = require('ejs');
const bootstrapper = require('react-async-bootstrapper');

const ReactDomServer = require('react-dom/server');

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

const Module = module.constructor;

const mfs = new MemoryFs;
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBoundle, createStoreMap;
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
	createStoreMap = m.exports.createStoreMap;
});

const getStoreState = (stores) => {
	return Object.keys(stores).reduce((result, storeName) => {
		result[storeName] = stores[storeName].toJson();
		return result;
	}, {});
}

module.exports = (app) => {

    app.use('/public', proxy({
        target: 'http://localhost:8888'
    }));

    app.get('*', (req, res) => {
        getTemplate().then(temp => {
			let routerContext = {};
			const stores = createStoreMap();
			const params = serverBoundle(stores, routerContext, req.url);

			bootstrapper(params).then(() => {
				if(routerContext.url){
					res.status(302).setHeader('Location', routerContext.url);
					res.end();
					return;
				}
				const state = getStoreState(stores);
				const content = ReactDomServer.renderToString(params);

				const html = ejs.render(temp, {
					appString: content,
					initialState: serialize(state)
				});

				res.send(html);

			}).catch(err => console.log(err));

        }).catch(err => console.log(err));
    });
};
