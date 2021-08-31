const ADD_ACTIVITY = "ADD_ACTIVITY";


export function addActivity(activity) {
    return {
        type: ADD_ACTIVITY,
        payload: activity
    }

    // Para poder hacer acciones asincrónicas, recordar que necesitamos el middleware thunk npm install redux-thunk
}