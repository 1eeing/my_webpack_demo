import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line
import App from 'VIEW/App';
import appState from './store/store';

const root = document.getElementById('root');
const render = (Component) => {
  ReactDom.render(
    <AppContainer>
		<Provider store={appState}>
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
    module.hot.accept('VIEW/App', () => {
        const NextApp = require('VIEW/App').default; // eslint-disable-line
        render(NextApp);
    });
}
