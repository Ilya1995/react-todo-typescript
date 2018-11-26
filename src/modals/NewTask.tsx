import * as React from 'react';
import {Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {PRIORITY} from '../store/initialState';
import {ITask} from '../store/initialState';
import * as moment from 'moment';

interface IProps {
    isOpenModal: boolean,
    updateTask: ITask | null,
    okModal: (e: React.FormEvent<HTMLFormElement>) => void,
    closeModal: () => void
}

interface IState {
    priority: string
}

class NewTask extends React.Component<IProps, IState> {
    state: IState = {
        priority: PRIORITY[0]
    };

    static getDerivedStateFromProps(nextProps: IProps) {
        if (nextProps.updateTask) {
            return {priority: nextProps.updateTask.priority};
        }
        return null;
    }

    handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const {name, value}: any = e.target;
        // @ts-ignore
        this.setState({[name]: value});
    };

    render() {
        const {isOpenModal, updateTask, okModal, closeModal} = this.props;

        return (
            <Modal open={isOpenModal} onClose={closeModal} style={{'overflowY': 'auto'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <form onSubmit={okModal} className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center">{updateTask ? 'Изменить задачу' : 'Добавить задачу'}</h5>
                            <button onClick={closeModal} type="button" className="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body px-5">
                            <TextField name="title" defaultValue={updateTask ? updateTask.title : ''}
                                       required={true} label="Название" className="col-sm-12"/>
                            <br/>
                            <TextField name="description" defaultValue={updateTask ? updateTask.description : ''}
                                       label="Описание" multiline required={true} margin="normal"
                                       rowsMax="4" className="col-sm-12 mb-0"/>
                            <br/>
                            <FormControl className="col-sm-12" margin="normal" required={true}>
                                <InputLabel htmlFor="priority-simple">Приоритет</InputLabel>
                                <Select value={this.state.priority} name="priority"
                                        onChange={this.handleChange}
                                        inputProps={{name: 'priority', id: 'priority-simple'}}>
                                    {PRIORITY.map((task, index) => (
                                        <MenuItem key={index} value={task}>{task}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br/>
                            <div className="row mx-0">
                                <TextField name="deadlineDate" label="Дата окончания" type="date" required={true}
                                           defaultValue={updateTask ? moment(updateTask.deadline).format('YYYY-MM-DD') : ''}
                                           margin="normal" className="col-sm-5" InputLabelProps={{shrink: true}}/>
                                <div className="col-sm-2"/>
                                <TextField name="deadlineTime" label="Время окончания" type="time" required={true}
                                           defaultValue={updateTask ? moment(updateTask.deadline).format('HH:mm') : ''}
                                           margin="normal" className="col-sm-5" InputLabelProps={{shrink: true}}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <Button variant="contained" onClick={closeModal}>Отмена</Button>
                            <Button variant="contained" color="primary" type="submit">Подтвердить</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
}

export default NewTask;