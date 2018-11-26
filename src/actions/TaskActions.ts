import {ITask} from '../store/initialState';

export const ADD_TASK: string = 'ADD_TASK';
export const REMOVE_TASK: string = 'REMOVE_TASK';
export const UPDATE_TASK: string = 'UPDATE_TASK';
export const UPDATE_FILTER_TASK: string = 'UPDATE_FILTER_TASK';

export interface IaddUpdateTask {
    type: string;
    payload: ITask
}

export interface IupdateFilter {
    type: string;
    payload: string
}

export interface IremoveTask {
    type: string;
    payload: number
}

export type TaskAction = IaddUpdateTask | IupdateFilter | IremoveTask;

export function addTask(task: ITask): IaddUpdateTask {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export function updateFilter(filter: string): IupdateFilter {
    return {
        type: UPDATE_FILTER_TASK,
        payload: filter
    }
}

export function removeTask(id: number): IremoveTask {
    return {
        type: REMOVE_TASK,
        payload: id
    }
}

export function updateTask(task: ITask): IaddUpdateTask {
    return {
        type: UPDATE_TASK,
        payload: task
    }
}
