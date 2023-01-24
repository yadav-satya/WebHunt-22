const INITIAL_STATE = false;

function loaderReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SHOW_LOADER':
			return true;
		case 'REMOVE_LOADER':
			return false;
		default:
			return state;
	}
}

export default loaderReducer;