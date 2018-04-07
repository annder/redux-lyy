export const ActionType = {
	INIT: '@@redux/INIT' +
        Math.random().toString(16).substring(7).split('').join('.'),
	REPLCAE: '@@redux/REPLACE' +
        Math.random().toString(16).substring(7).split('').join('.')
};