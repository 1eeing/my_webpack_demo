import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('store') @observer
class TopicList extends Component {
	componentDidMount() {
		// todo
	}

	bootstrap() {
		return new Promise((resolve) => {
			setTimeout(() => {
				this.props.store.count = 5;
				resolve(true);
			}, 0);
		});
	}

	render() {
		return (
			<div>
				this is TopicList
				<span>{this.props.store.count}</span>
			</div>
		);
	}
}

TopicList.propTypes = {
	store: PropTypes.object.isRequired
};

export default TopicList;
