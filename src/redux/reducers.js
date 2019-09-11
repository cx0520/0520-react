//根据之前的prevState来生成newState
import {combineReducers} from 'redux';
import {SAVE_USER} from "./action-types";

const initUser = {
    user:{},
    token: ''
};

function user(prevState = initUser,action) {
    switch (action.type) {
        case SAVE_USER:
            return action.data;
        default :
            return prevState;
    }
}

export default combineReducers({
    user
})