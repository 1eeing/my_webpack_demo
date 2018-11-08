import { observable, computed, action } from 'mobx';

class AppState {
	@observable price = 0;

    @observable amount = 1;

    @computed get total() {
        return this.price * this.amount;
    }

    @action changePrice(val) {
        this.price = val;
    }

    @action changeAmount(val) {
        this.amount = val;
    }
}

const appState = new AppState();

export default appState;
