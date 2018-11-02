import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import { AppContainer } from 'react-hot-loader';

const root = document.getElementById('root');
const _render = Component => {
    render(
        <AppContainer>
            <Component />
        </AppContainer>,
        root
    )
}
_render(App);

if(module.hot){
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default;
        _render(NextApp);
    });
}