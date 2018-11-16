import { observable, computed, action } from 'mobx';

class AppState {
	constructor({ count } = { count: 0 }) {
		this.count = count;
	}

	@observable price = 0;

	@observable amount = 1;

	@observable count;

    @computed get total() {
        return this.price * this.amount;
    }

    @action changePrice(val) {
        this.price = val;
    }

    @action changeAmount(val) {
        this.amount = val;
	}

	toJson() {
		return {
			count: this.count
		};
	}
}

export default AppState;
