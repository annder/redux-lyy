export const Compose = (...arg) => {
	if (arg.length == 1) {
		return arg[0];
	}
	if (arg.length === 0) {
		return arg => arg;
	}
	return arg.reduce((a, b) => (...arg) => a(b(...arg)));
};