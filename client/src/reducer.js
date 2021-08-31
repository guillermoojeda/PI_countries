const ADD_ACTIVITY = "ADD_ACTIVITY";
const ADD_COUNTRIES = "ADD_COUNTRIES";
const SET_COUNTRY = "SET_COUNTRY";


const initialState = {
    activities: [],
    countries: [],
    country: []
}

export default function rootReducer(state = initialState, action) {
    if (action.type === ADD_ACTIVITY) {
        return {
            ...state,
            activities: [...state.activities, action.payload]
        }
    }

    if (action.type === ADD_COUNTRIES) {
        return {
            ...state,
            countries: action.payload
        }
    }

    if (action.type === SET_COUNTRY) {
        return {
            ...state,
            country: action.payload
        }
    }

    return state;
}