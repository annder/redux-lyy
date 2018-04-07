function bindActionCreator(actionCreator, dispatch) {
	return (...arg) => dispatch(actionCreator(...arg));
}
export default function bindActionCreators(actionCreators, dispatch) {
	if (typeof actionCreator == 'function') {
		return bindActionCreator(actionCreators);
	}
	if (typeof actionCreator !== 'object' || actionCreators == null) {
		throw new Error('import is error...');
	}
	const keys = Object.keys(actionCreators);
	const boundActionCreators = {};
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const actionCreator = actionCreators[key];
		if (typeof actionCreator === 'function') {
			boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
		}
	}
	return boundActionCreators;
}