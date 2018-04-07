# Redux 刨析

## dispatch

```js
try {
	isDispatching = true;
	currentState = currentReducer(currentState, action);
}
finally {
	isDispatching = false;
}        
```

## createStore

```js
let isSubscribed = true;
ensureCanMutateNextListeners();
nextListeners.push(listener);
```

## applyMidleware 

```js
const midlewareAPI = {
	getState: store.getState,
	dispatch: (...arg) => dispatch(...arg)
};
chain = midlewares.map(midleware => midleware(midlewareAPI));
dispatch = Compose(...chain)(store.dispatch);
```