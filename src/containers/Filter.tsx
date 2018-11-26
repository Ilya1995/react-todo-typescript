import * as React from 'react';
import {connect} from 'react-redux';
import {FILTERS_TASK, IApplicationState} from '../store/initialState';
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {updateFilter, TaskAction} from '../actions/TaskActions';
import {Dispatch} from 'redux';

interface IProps {
    filter: string,
    updateFilterDispatch: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

class Filter extends React.Component<IProps> {

    render() {
        const filter = this.props.filter;
        const {updateFilterDispatch} = this.props;

        return (
            <React.Fragment>
                <FormControl className="col-6 col-sm-3 col-md-2" margin="normal">
                    <InputLabel htmlFor="priority-simple">Приоритет</InputLabel>
                    <Select value={filter}
                            onChange={updateFilterDispatch}
                            inputProps={{name: 'priority', id: 'priority-simple'}}>
                        {FILTERS_TASK.map((priority, index) => (
                            <MenuItem key={index} value={priority}>{priority}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </React.Fragment>
        )
    }
}


const mapStateToProps = ({task}: IApplicationState) => ({
    filter: task.filterTask
});

const mapDispatchToProps = (dispatch: Dispatch<TaskAction>) => ({
    updateFilterDispatch: (e: React.ChangeEvent<HTMLSelectElement>) => dispatch(updateFilter(e.target.value))
});


export default connect(mapStateToProps, mapDispatchToProps)(Filter)