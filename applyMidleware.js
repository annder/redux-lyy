import {
	Compose
} from './Compose';

export default function applyMidleware(...midlewares) {
	return (createStore) => (reducer, preloadedState, enhancer) => {
		const store = createStore(reducer, preloadedState, enhancer);
		let dispatch = store.dispatch;
		let chain = [];
		const midlewareAPI = {
			getState: store.getState,
			dispatch: (...arg) => dispatch(...arg)
		};
		chain = midlewares.map(midleware => midleware(midlewareAPI));
		dispatch = Compose(...chain)(store.dispatch);
		return {
			...store,
			dispatch
		};
	};
}