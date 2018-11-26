import {
    UPDATE_FILTER_TASK,
    ADD_TASK,
    UPDATE_TASK,
    REMOVE_TASK
} from '../actions/TaskActions';
import {REMOVE_PROJECT} from '../actions/ProjectActions';
import {Reducer} from 'redux';
import {stateTask as initialState, IStateTask} from '../store/initialState';
import * as _ from 'lodash';

const reducer: Reducer<IStateTask> = (state = initialState, action) => {
    let newState;

    switch (action.type) {

        case UPDATE_FILTER_TASK:
            newState = {...state, filterTask: action.payload};
            break;

        case ADD_TASK:
            newState = {...state, tasks: [...state.tasks, action.payload]};
            break;

        case UPDATE_TASK:
            newState = {
                ...state,
                tasks: _.map(state.tasks, (task) => task.id === action.payload.id ? action.payload : task)
            };
            break;

        case REMOVE_TASK:
            newState = {...state, tasks: _.reject(state.tasks, (task) => task.id === action.payload)};
            break;

        case REMOVE_PROJECT:
            newState = {...state, tasks: _.reject(state.tasks, (task) => task.projectId === action.payload)};
            break;

        default:
            newState = state;
            break;
    }

    if (typeof Storage !== 'undefined') {
        sessionStorage.setItem('stateTask', JSON.stringify(newState));
    }

    return newState;
};

export {reducer as taskReducer}