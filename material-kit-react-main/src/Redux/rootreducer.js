import { combineReducers } from "redux";
import usersReduce from "./reducer";

const rootReducer = combineReducers({
    data : usersReduce
    
});

export default rootReducer