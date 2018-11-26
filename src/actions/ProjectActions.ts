import {IProject} from '../store/initialState';

export const ADD_PROJECT: string = 'ADD_PROJECT';
export const UPDATE_PROJECT: string = 'UPDATE_PROJECT';
export const REMOVE_PROJECT: string = 'REMOVE_PROJECT';
export const SELECT_PROJECT: string = 'SELECT_PROJECT';

export interface IProjectActions {
    type: string;
    payload: IProject
}

export interface IremoveProject {
    type: string;
    payload: number
}

export type ProjectActions = IProjectActions | IremoveProject;

export function addProject(project: IProject): IProjectActions {
    return {
        type: ADD_PROJECT,
        payload: project
    }
}

export function updateProject(project: IProject): IProjectActions {
    return {
        type: UPDATE_PROJECT,
        payload: project
    }
}

export function removeProject(id: number): IremoveProject {
    return {
        type: UPDATE_PROJECT,
        payload: id
    }
}

export function selectProject(project: IProject): IProjectActions {
    return {
        type: SELECT_PROJECT,
        payload: project
    }
}