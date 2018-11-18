import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

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
				<Helmet>
					<title>this is topicList</title>
					<meta name="description" content="this is a description" />
				</Helmet>
				this is TopicList.Haha
				<span>{this.props.store.count}</span>
			</div>
		);
	}
}

TopicList.propTypes = {
	store: PropTypes.object.isRequired
};

export default TopicList;
