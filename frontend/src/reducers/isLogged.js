const isLoggedReducer = (state = null, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS': 
            return state = true;
        case 'LOGOUT':
            return state = false;
        default:
            return state;
    }
};

export default isLoggedReducer;
