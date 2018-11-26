import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index';
import {stateProject, stateTask} from './store/initialState';
import App from './containers/App';
import './css/bootstrap.min.css';
import './css/styles.css';

let initialState = {task: stateTask, project: stateProject};
if (typeof Storage !== 'undefined' && sessionStorage.stateProject && sessionStorage.stateTask) {
    const oldStateProject = JSON.parse(sessionStorage.stateProject);
    const oldStateTask = JSON.parse(sessionStorage.stateTask);
    initialState = {task: oldStateTask, project: oldStateProject};
}
// попробовать выпилить initialState
const store = createStore(rootReducer(), initialState);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
