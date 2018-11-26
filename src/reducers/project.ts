import {
    ADD_PROJECT,
    UPDATE_PROJECT,
    REMOVE_PROJECT,
    SELECT_PROJECT
} from '../actions/ProjectActions';
import {Reducer} from 'redux';
import {stateProject as initialState, IStateProject} from '../store/initialState';
import * as _ from 'lodash';

const reducer: Reducer<IStateProject> = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case ADD_PROJECT:
            newState = {...state, projects: [...state.projects, action.payload]};
            break;

        case UPDATE_PROJECT:
            newState = {
                ...state,
                projects: _.map(state.projects,
                    (project) => project.id === action.payload.id ? action.payload : project),
                project: state.projects[0]
            };
            break;

        case REMOVE_PROJECT:
            newState = {
                ...state, projects: _.reject(state.projects, (project) => project.id === action.payload),
                project: state.projects[0]
            };
            break;

        case SELECT_PROJECT:
            newState = {...state, selectedProject: action.payload};
            break;

        default:
            newState = state;
            break;
    }

    if (typeof Storage !== 'undefined') {
        sessionStorage.setItem('stateProject', JSON.stringify(newState));
    }

    return newState
};

export {reducer as projectReducer}