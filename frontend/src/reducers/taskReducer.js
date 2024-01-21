import { GET_TASKS, ADD_TASK, UPDATE_TASK, TASK_LOADING, CLEAR_TASKS, TASK_ERROR } from "../actions/taskTypes";

const initialState = {
    tasks: [],
    loading: false,
    error: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            };
        case ADD_TASK:
        case UPDATE_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            };
        case TASK_LOADING:
            return {
                ...state,
                loading: true
            };
        case CLEAR_TASKS:
            return {
                ...state,
                tasks: []
            };
        case TASK_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
