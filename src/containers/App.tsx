import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import Task from './Task';
import Project from './Project';
import NewTask from '../modals/NewTask';
import {addTask, TaskAction} from '../actions/TaskActions';
import {IApplicationState, IStateProject, ITask} from '../store/initialState';
import {AppBar, Button} from '@material-ui/core';
import * as moment from 'moment';

interface IProps {
    project: IStateProject,
    addTaskDispatch: (task: ITask) => void
}

interface IState {
    isOpenModalNewTask: boolean
}

class App extends React.Component<IProps, IState> {
    state: IState = {
        isOpenModalNewTask: false
    };

    switchModel = () => {
        this.setState({isOpenModalNewTask: !this.state.isOpenModalNewTask});
    };

    addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {addTaskDispatch, project} = this.props;
        if (project && project.selectedProject) {
            const {title, description, deadlineDate, deadlineTime, priority}: any = e.currentTarget;
            addTaskDispatch({
                id: +moment(),
                projectId: project.selectedProject.id,
                title: title.value,
                description: description.value,
                deadline: moment(deadlineDate.value + ' ' + deadlineTime.value),
                priority: priority.value,
                finished: false
            });
        } else {
            console.error('Еггого');
        }
        this.switchModel();
    };

    public render() {
        const {isOpenModalNewTask} = this.state;
        const {project} = this.props;

        return (
            <React.Fragment>
                <div className='container-fluid pb-5'>
                    <AppBar position='fixed' className='p-3'>
                        <div className="row align-items-center justify-content-between px-3">
                            <div className="col-6">
                                {
                                    !project.selectedProject ?
                                        null :
                                        <Button variant="contained" onClick={this.switchModel}>Добавить задачу</Button>
                                }
                            </div>

                            <Project/>
                        </div>
                    </AppBar>

                    <br/><br/>
                    <br/><br/>

                    <Task/>
                </div>
                <NewTask isOpenModal={isOpenModalNewTask}
                         updateTask={null}
                         okModal={this.addTask}
                         closeModal={this.switchModel}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({project}: IApplicationState) => ({
    project
});

const mapDispatchToProps = (dispatch: Dispatch<TaskAction>) => ({
    addTaskDispatch: (task: ITask) => dispatch(addTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
