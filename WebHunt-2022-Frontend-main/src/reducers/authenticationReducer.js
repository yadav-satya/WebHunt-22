const INITIAL_STATE = null;

function authenticationReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'SIGN_IN':
			return action.payload;
		case 'SIGN_OUT':
			return null;
		case 'UPDATE_USER':
			return action.payload;
        case 'ADD_TEAM_DATA':
			const {teamName,teamId}=action.payload;
			// let {user}=state;
			state['teamName']=teamName;
			state['teamId']=teamId;
			console.log(state);
			return state;
		default:
			return state;
	}
}

export default authenticationReducer;
