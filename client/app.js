import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import App from 'VIEW/App';
import AppState from './store/store';

const initialState = window.__INITIAL__STATE__ || {}; // eslint-disable-line

const root = document.getElementById('root');
const render = (Component) => {
  ReactDom.render(
    <AppContainer>
		<Provider store={new AppState(initialState.store)}>
			<Router>
				<Component />
			</Router>
		</Provider>
    </AppContainer>,
    root
  );
};

render(App);

if (module.hot) {
    module.hot.accept('./views/App', () => {
        const NextApp = require('./views/App').default; // eslint-disable-line
        render(NextApp);
    });
}
