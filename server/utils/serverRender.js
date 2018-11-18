const serialize = require('serialize-javascript');
const ejs = require('ejs');
const bootstrapper = require('react-async-bootstrapper');
const ReactDomServer = require('react-dom/server');
const Helmet = require('react-helmet').default;

const getStoreState = (stores) => {
	return Object.keys(stores).reduce((result, storeName) => {
		result[storeName] = stores[storeName].toJson();
		return result;
	}, {});
}

module.exports = (bundle, template, req, res) => {
    return new Promise((resolve, reject) => {
        const createStoreMap = bundle.createStoreMap
        const createApp = bundle.default

        let routerContext = {};
        const stores = createStoreMap();
        const app = createApp(stores, routerContext, req.url);

        bootstrapper(app).then(() => {
            if(routerContext.url){
                res.status(302).setHeader('Location', routerContext.url);
                res.end();
                return;
            }
            
            const state = getStoreState(stores);
            const content = ReactDomServer.renderToString(app);
            const helmet = Helmet.renderStatic();

            const html = ejs.render(template, {
                appString: content,
                initialState: serialize(state),
                meta: helmet.meta.toString(),
                title: helmet.title.toString(),
                style: helmet.style.toString(),
                link: helmet.link.toString()
            });

            res.send(html);
            resolve();
        }).catch(reject);
    });
}