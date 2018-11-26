import * as moment from 'moment';

export const PRIORITY: string[] = ['Нормальный', 'Высокий', 'Неотложный'];

export interface IProject {
    id: number;
    title: string;
    description: string;
}

export interface IStateProject {
    projects: IProject[],
    selectedProject: IProject | null
}

export interface ITask {
    id: number;
    projectId: number;
    title: string;
    description: string;
    deadline: moment.Moment;
    priority: string;
    finished: boolean;
}

export interface IStateTask {
    tasks: ITask[]
    filterTask: string
}

export interface IApplicationState {
    project: IStateProject,
    task: IStateTask
}

export const stateProject: IStateProject = {
    projects: [{
        id: +moment().add(1, 'days'),
        title: 'Проект 1',
        description: 'Инфа по первому проекту'
    }, {
        id: +moment().add(2, 'days'),
        title: 'Проект 2',
        description: 'Инфа по второму проекту'
    }],
    selectedProject: null
};

export const stateTask: IStateTask = {
    tasks: [{
        id: +moment().add(3, 'days'),
        projectId: stateProject.projects[0].id,
        title: 'Задача 1',
        description: 'Сделать побыстрей',
        deadline: moment('2018-10-31 15:16'),
        priority: PRIORITY[2],
        finished: true
    }, {
        id: +moment().add(4, 'days'),
        projectId: stateProject.projects[1].id,
        title: 'Задача 2',
        description: 'Сделать побыстрей',
        deadline: moment('2018-11-01 05:12'),
        priority: PRIORITY[1],
        finished: false
    }, {
        id: +moment().add(5, 'days'),
        projectId: stateProject.projects[1].id,
        title: 'Задача 3',
        description: 'Сделать побыстрей',
        deadline: moment('2018-12-01 22:32'),
        priority: PRIORITY[2],
        finished: false
    }, {
        id: +moment().add(6, 'days'),
        projectId: stateProject.projects[0].id,
        title: 'Задача 4',
        description: 'Сделать побыстрей',
        deadline: moment('2018-12-16 12:02'),
        priority: PRIORITY[0],
        finished: false
    }, {
        id: +moment().add(7, 'days'),
        projectId: stateProject.projects[1].id,
        title: 'Задача 5',
        description: 'Сделать побыстрей',
        deadline: moment('2018-12-16 12:02'),
        priority: PRIORITY[1],
        finished: false
    }, {
        id: +moment().add(8, 'days'),
        projectId: stateProject.projects[0].id,
        title: 'Задача 6',
        description: 'Сделать побыстрей',
        deadline: moment('2018-12-16 12:02'),
        priority: PRIORITY[1],
        finished: false
    }],
    filterTask: 'Все'
};

export const FILTERS_TASK: string[] = [stateTask.filterTask, ...PRIORITY];