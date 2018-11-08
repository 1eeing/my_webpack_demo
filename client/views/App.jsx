import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../config/router';

class App extends Component {
	componentDidMount() {
		// todo
	}

	render() {
		return [
			<div>
				<Link exact to="/">List</Link>
				<Link to="/detail">Detail</Link>
			</div>,
			<Routes />
		];
	}
}

export default App;
