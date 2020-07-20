const initialState = {
    email: '',
    provider: '',
    user: {
        my_profile: null,
        profiles: []
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                email: action.email,
                provider: action.provider
            };
        case 'USER_DATA':
            return {
                ...state,
                user: action.payload
            };

        default:
            return state;
    }
}