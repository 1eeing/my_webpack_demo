import AppStateClass from './store';

export const AppState = AppStateClass;

export default {
	AppState
};

export const createStoreMap = () => ({
	store: new AppState()
});
