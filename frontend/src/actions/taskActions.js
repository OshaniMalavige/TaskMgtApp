import axios from "axios";
import {ADD_TASK, UPDATE_TASK, TASK_LOADING, CLEAR_TASKS, TASK_ERROR, GET_TASKS} from "./taskTypes";

// Add task
export const addTask = (taskData) => dispatch => {
    axios
        .post("/api/tasks/add", taskData)
        .then(res => {
            dispatch({
                type: ADD_TASK,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: TASK_ERROR,
                payload: err.response.data
            })
        );
};

// retrieve tasks
export const getTask = () => (dispatch) => {
    dispatch(setTaskLoading());
    axios
        .get("/api/tasks/")
        .then((res) =>
            dispatch({
                type: GET_TASKS,
                payload: res.data
            })
        )
        .catch((err) =>
            dispatch({
                type: TASK_ERROR,
                payload: err.response.data
            })
        );
};

// Update task
export const updateTask = (taskId, taskData) => dispatch => {
    axios
        .put(`/api/tasks/update/${taskId}`, taskData)
        .then(res =>
            dispatch({
                type: UPDATE_TASK,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: TASK_ERROR,
                payload: err.response.data
            })
        );
};

// Set loading state
export const setTaskLoading = () => {
    return {
        type: TASK_LOADING
    };
};

// Clear tasks
export const clearTasks = () => {
    return {
        type: CLEAR_TASKS
    };
};
