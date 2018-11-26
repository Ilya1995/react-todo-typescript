import * as React from 'react';
import {connect} from 'react-redux';
import {FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip} from '@material-ui/core';
import {AddCircle, Settings} from '@material-ui/icons';
import NewProject from '../modals/NewProject';
import * as moment from 'moment';
import {IApplicationState, IProject, IStateProject} from '../store/initialState';
import {Dispatch} from 'redux';
import {ProjectActions, addProject, updateProject, removeProject, selectProject} from '../actions/ProjectActions';

interface IProps {
    project: IStateProject,
    addProjectDispatch: (project: IProject) => void,
    updateProjectDispatch: (project: IProject) => void,
    removeProjectDispatch: (id: number) => void,
    selectProjectDispatch: (project: IProject | null) => void
}

interface IState {
    isOpenModal: boolean,
    selectedUpdateProject: IProject | null
}

class Project extends React.Component<IProps, IState> {

    state: IState = {
        isOpenModal: false,
        selectedUpdateProject: null
    };

    switchModel = () => {
        const {isOpenModal} = this.state;
        this.setState({isOpenModal: !isOpenModal});
    };

    updateProjectOpenModal = (project: IProject) => {
        this.setState({selectedUpdateProject: project});
        this.switchModel();
    };

    updateProjectCloseModal = () => {
        this.setState({selectedUpdateProject: null});
        this.switchModel();
    };

    addProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.switchModel();
        const {title, description}: any = e.currentTarget;
        const {addProjectDispatch} = this.props;
        addProjectDispatch({
            id: +moment(),
            title: title.value,
            description: description.value
        });
    };

    updateProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {title, description}: any = e.currentTarget;
        const {updateProjectDispatch} = this.props;
        const {selectedUpdateProject} = this.state;
        if (selectedUpdateProject) {
            updateProjectDispatch({
                id: selectedUpdateProject.id,
                title: title.value,
                description: description.value
            });
        } else {
            console.error('Еггого');
        }
        this.updateProjectCloseModal();
    };

    removeProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {removeProjectDispatch} = this.props;
        const {selectedUpdateProject} = this.state;
        if (selectedUpdateProject) {
            removeProjectDispatch(selectedUpdateProject.id);
        } else {
            console.error('Еггого');
        }
        this.updateProjectCloseModal();
    };

    selectProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {selectProjectDispatch, project} = this.props;
        const selectedProject: IProject | null = project.projects.find((el) => el.id === +e.target.value) || null;
        selectProjectDispatch(selectedProject);
    };

    render() {
        const {isOpenModal, selectedUpdateProject} = this.state;
        const {projects, selectedProject} = this.props.project;
        const projectId: number = selectedProject ? selectedProject.id : 0;

        return (
            <div className="col-md-3 col-6 px-0">
                <IconButton className="col-2" onClick={this.switchModel}>
                    <Tooltip title="Добавить проект">
                        <AddCircle classes={{root: 'ctm-clr'}}/>
                    </Tooltip>
                </IconButton>

                <FormControl className="col-10 m-0" margin="normal">
                    <InputLabel classes={{root: 'ctm-clr'}} htmlFor="change-project">Выберите проект</InputLabel>
                    <Select classes={{root: 'ctm-clr-border', select: 'ctm-clr', icon: 'ctm-clr'}}
                            value={projectId}
                            onChange={this.selectProject}
                            inputProps={{
                                name: 'project',
                                id: 'change-project'
                            }}>
                        <MenuItem value="0">
                            <div className="row align-items-center justify-content-between col-12 pr-0">
                                <div className='col-9 px-0 elliosis'>Все</div>
                            </div>
                        </MenuItem>
                        {projects.map((project) => (
                            <MenuItem key={project.id} value={project.id}>
                                <div className="row align-items-center justify-content-between col-12 pr-0">
                                    <div className='col-9 px-0 elliosis'>{project.title}</div>
                                    <Settings className='change-project px-0'
                                              onClick={this.updateProjectOpenModal.bind(this, project)}/>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <NewProject isOpenModal={isOpenModal}
                            updateProject={selectedUpdateProject}
                            removeProject={this.removeProject}
                            okModal={selectedUpdateProject ? this.updateProject : this.addProject}
                            closeModal={this.updateProjectCloseModal}/>
            </div>


        )
    }
}


const mapStateToProps = ({project}: IApplicationState) => ({
    project
});

const mapDispatchToProps = (dispatch: Dispatch<ProjectActions>) => ({
    addProjectDispatch: (project: IProject) => dispatch(addProject(project)),
    updateProjectDispatch: (project: IProject) => dispatch(updateProject(project)),
    removeProjectDispatch: (id: number) => dispatch(removeProject(id)),
    selectProjectDispatch: (project: IProject) => dispatch(selectProject(project))
});

export default connect(mapStateToProps, mapDispatchToProps)(Project)