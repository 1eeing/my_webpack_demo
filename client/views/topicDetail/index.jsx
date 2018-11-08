import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('store') @observer
class TopicDetail extends Component {
	constructor(props) {
		super(props);
		this.changePrice = this.changePrice.bind(this);
		this.changeAmount = this.changeAmount.bind(this);
	}

	changePrice(e) {
		this.props.store.changePrice(e.target.value);
	}

	changeAmount(e) {
		this.props.store.changeAmount(e.target.value);
	}

	render() {
		return (
			<div>
				<div>
					{`price: ${this.props.store.price}`}
					<input type="text" onChange={this.changePrice} />
				</div>
				<div>
					{`amount: ${this.props.store.amount}`}
					<input type="text" onChange={this.changeAmount} />
				</div>
				<div>
					{`total: ${this.props.store.total}`}
				</div>
			</div>
		);
	}
}

TopicDetail.propTypes = {
	store: PropTypes.object.isRequired
};

export default TopicDetail;
