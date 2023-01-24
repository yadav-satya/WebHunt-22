import { combineReducers } from "redux";
import authenticationReducer from './authenticationReducer';
import teamReducer from "./teamReducer";
import loaderReducer from "./loaderReducer";
export default combineReducers({
    user:authenticationReducer,
    teamMembers:teamReducer,
    loading:loaderReducer
});