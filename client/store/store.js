import { observable, computed } from 'mobx';

class AppState {
	@observable price = 0;

    @observable amount = 1;

    @computed get total() {
        return this.price * this.amount;
    }
}

const appState = new AppState();

export default appState;
