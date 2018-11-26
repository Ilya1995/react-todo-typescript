import * as React from 'react';
import {connect} from 'react-redux';
import NewTask from '../modals/NewTask';
import Filter from './Filter';
import {
    Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Checkbox, TablePagination,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography
} from '@material-ui/core';
import {Delete, ExpandMore, Update} from '@material-ui/icons';
import * as moment from 'moment';
import {IApplicationState, IStateTask, IStateProject, ITask} from '../store/initialState';
import {removeTask, updateTask, TaskAction} from '../actions/TaskActions';
import {Dispatch} from 'redux';

// @ts-ignore
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;// для новой версии Typography

interface IProps {
    task: IStateTask,
    project: IStateProject,
    removeTaskDispatch: (id: number) => void,
    updateTaskDispatch: (task: ITask) => void
}

interface IState {
    isOpenModal: boolean,
    selectedTask: ITask | null,
    page: number,
    rowsPerPage: number
}

class Task extends React.Component<IProps, IState> {

    state: IState = {
        isOpenModal: false,
        selectedTask: null,
        page: 0,
        rowsPerPage: 5
    };

    onChangeRemove = (id: number) => {
        const {removeTaskDispatch} = this.props;
        removeTaskDispatch(id);
    };

    onChangeFinished = (task: ITask) => {
        const {updateTaskDispatch} = this.props;
        updateTaskDispatch({...task, finished: !task.finished});
    };

    handleUpdate = (task: ITask) => {
        this.setState({selectedTask: task});
        this.switchModel();
    };

    onChangePage = (e: React.MouseEvent<HTMLButtonElement>, page: number) => {
        this.setState({page})
    };

    onChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({rowsPerPage: +e.target.value});
    };

    switchModel = () => {
        const {isOpenModal} = this.state;
        this.setState({isOpenModal: !isOpenModal});
    };

    updateTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {updateTaskDispatch} = this.props;
        const {selectedTask} = this.state;
        const {title, description, priority, deadlineDate, deadlineTime}: any = e.currentTarget;

        if (selectedTask) {
            this.switchModel();
            updateTaskDispatch({
                ...selectedTask,
                title: title.value,
                description: description.value,
                priority: priority.value,
                deadline: moment(deadlineDate.value + ' ' + deadlineTime.value)
            });
        }
    };

    render() {
        let {tasks} = this.props.task;
        const {filterTask} = this.props.task;
        const {selectedProject} = this.props.project;
        const {isOpenModal, selectedTask, page, rowsPerPage} = this.state;
        tasks = tasks.filter((task) => {
            return ((filterTask === 'Все' || task.priority === filterTask) &&
                (!selectedProject || task.projectId === selectedProject.id));
        });

        return (
            <div className="mt-5">
                <h4 className="text-center py-3">Текущие задачи</h4>
                <Paper className="container modal-lg">
                    <Filter/>
                    <br/>
                    <div className="table-responsive">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{'width': '42%'}} className="font-title-table">Задача</TableCell>
                                    <TableCell style={{'width': '25%'}} className="font-title-table">Крайний
                                        срок</TableCell>
                                    <TableCell style={{'width': '33%'}}
                                               className="font-title-table">Приоритет</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="p-0" colSpan={3}>
                                            <ExpansionPanel className="shadow-none panel-hover">
                                                <ExpansionPanelSummary className="p-0" expandIcon={<ExpandMore/>}>
                                                    <div className="col-5 td-p">
                                                        {task.finished ? <del>{task.title}</del> : task.title}
                                                    </div>
                                                    <div className="col-3 td-p">
                                                        {task.finished ?
                                                            <del>{moment(task.deadline).format('DD.MM.YYYY HH:mm')}</del>
                                                            : moment(task.deadline).format('DD.MM.YYYY HH:mm')}
                                                    </div>
                                                    <div className="col-4 td-p">
                                                        {task.finished ? <del>{task.priority}</del> : task.priority}
                                                    </div>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails className="d-inline-block">
                                                    <Typography>
                                                        {task.description}
                                                    </Typography>
                                                    <br/>
                                                    <Typography>
                                                        <Checkbox onChange={this.onChangeFinished.bind(this, task)}
                                                                  checked={task.finished} color="primary"/> Задача
                                                        выполнена
                                                        <br/>
                                                        <IconButton onClick={this.onChangeRemove.bind(this, task.id)}>
                                                            <Delete/>
                                                        </IconButton> Удалить задачу
                                                        <br/>
                                                        <IconButton onClick={this.handleUpdate.bind(this, task)}>
                                                            <Update/>
                                                        </IconButton> Обновить задачу
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </div>

                    <TablePagination
                        component="div"
                        count={tasks.length}
                        rowsPerPageOptions={[5, 10, 25]}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Предыдущая',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Следующая',
                        }}
                        onChangePage={this.onChangePage}
                        onChangeRowsPerPage={this.onChangeRowsPerPage}
                    />
                </Paper>

                <NewTask isOpenModal={isOpenModal}
                         updateTask={selectedTask}
                         okModal={this.updateTask}
                         closeModal={this.switchModel}/>
            </div>
        )
    }
}


const mapStateToProps = (state: IApplicationState) => ({
    task: state.task,
    project: state.project
});

const mapDispatchToProps = (dispatch: Dispatch<TaskAction>) => ({
    removeTaskDispatch: (id: number) => dispatch(removeTask(id)),
    updateTaskDispatch: (task: ITask) => dispatch(updateTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(Task)