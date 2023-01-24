const INITIAL_STATE = null;

function teamReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'TEAM_MEMBERS':
			return action.payload;
		case 'NEW_MEMBER_ADDED':
			return action.payload;
		default:
			return state;
	}
}

export default teamReducer;
