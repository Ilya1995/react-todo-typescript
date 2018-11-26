import { combineReducers } from 'redux'
import { taskReducer } from './task'
import { projectReducer } from './project'
import {IApplicationState} from '../store/initialState';



export default () => {
    return combineReducers<IApplicationState>({
        task: taskReducer,
        project: projectReducer
    })
}