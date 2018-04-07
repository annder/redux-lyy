import {
	isPlainObject
} from './isPlainObjec';
export function createStore(reducer, preloadedState, enhancer) {
	if (typeof enhancer == 'undefined' &&
		typeof preloadedState == 'function'
	) {
		enhancer = preloadedState;
		preloadedState = undefined;
	}
	if (typeof enhancer !== 'undefined') {
		if (typeof enhancer !== 'function') {
			throw new Error('enhancer must be a function');
		}
		return enhancer(createStore)(reducer, preloadedState);
	}
	if (typeof reducer !== 'function') {
		throw new Error('Expected the reducer to be a function');
	}
	let currentReducer = reducer;
	let currentState = preloadedState;
	let currentListeners = [];
	let nextListeners = currentListeners;
	let isDispatching = false;

	function ensureCanMutateNextListeners() {
		if (nextListeners === currentListeners) {
			nextListeners = currentListeners.slice();
		}
	}

	function getState() {
		if (isDispatching) {
			throw new Error('....');
		}
		return currentState;
	}

	function subscribe(listener) {
		if (typeof listener !== 'function') {
			throw new Error('Expexted the listen to be function');
		}
		let isSubscribed = true;
		ensureCanMutateNextListeners();
		nextListeners.push(listener);
		return function unsubscribe() {
			if (!isSubscribed) {
				return;
			}
			if (isDispatching) {
				throw new Error('...');
			}
			isSubscribed = false;
			ensureCanMutateNextListeners();
			const index = nextListeners.indexOf(listener);
			nextListeners.splice(index, 1);
		};
	}

	function dispatch(action) {
		if (!isPlainObject(action)) {
			throw new Error('...');
		}
		if (isDispatching) {
			throw new Error('...');
		}
		try {
			isDispatching = true;
			currentState = currentReducer(currentState, action);
		}
		finally {
			isDispatching = false;
		}
		const listeners = (currentListeners = nextListeners);
		for (let i = 0 ; i < listeners.length ;i ++) {
			const listener =listeners[i];
			listener();
		}
		return action;
	}
	return {
		subscribe,
		dispatch,
		getState

	};
}