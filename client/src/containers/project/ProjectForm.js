import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash';

import NameItem from '../../components/client/nameItem';
import RoomCard from './room/roomCard';

class ProjectForm extends Component {
    
    state = {
        project: {
            rooms: []
        },
        showName: false,
        showRoom: false
    }
    editNameHandler = this.editNameHandler.bind(this);
    nameChangeHandler = this.nameChangeHandler.bind(this);
    updateNameHandler = this.updateNameHandler.bind(this);
    addRoom = this.addRoom.bind(this);
    updateShowRoom = this.updateShowRoom.bind(this);
    updateProject = this.updateProject.bind(this);

    async componentDidMount() {
        const idArr = window.location.pathname.split('/');
        const clientId = idArr[2];
        console.log(clientId);
        const updateProject = await axios.get('/api/projects/' + clientId);
        this.setState({ project: updateProject.data[0] });
        console.log(this.state.project);
    }

    nameChangeHandler(e) {
        e.preventDefault();
        let project = {...this.state.project};
        project.name = e.target.value;
        this.setState({ project });
    }

    editNameHandler() {
        this.setState(prevState => ({ showName: !prevState.showName }));
    }

    updateNameHandler(val) {
        axios.put('/api/projects/'+this.state.project._id, { 'name': val });
        this.setState({ showName: false });
    }

    async addRoom(val) {
        const room = await axios.post('/api/projects/rooms', val);
        let project = {...this.state.project};
        project.rooms.push(room.data);
        this.setState({ project, showRoom: false });
    }

    updateShowRoom() {
        this.setState(prevState => ({ showRoom: !prevState.showRoom }));
    }

    updateProject(e) {
        e.preventDefault();
        console.log('[updateProject] this.state.project = ', this.state.project);
        axios.put('/api/projects/'+this.state.project._id, this.state.project);
        this.props.history.push('/projects');
    }

    render() {
        return (
            <div>
                <h5>Project Detail</h5>
                <NameItem
                    editOnClick={this.editNameHandler}
                    updateOnClick={this.updateNameHandler}
                    changeHandler={this.nameChangeHandler}
                    edit={this.state.showName}
                    clientId={this.state.project._id}
                    name={this.state.project.name}
                 />
                <RoomCard
                    clientId={this.state.project._id}
                    rooms={this.state.project.rooms}
                    addRoom={this.addRoom}
                    showRoom={this.state.showRoom}
                    updateShowRoom={this.updateShowRoom}
                 />
                <Link to="/" className="red btn-flat white-text left">Cancel</Link>
                <button className="green btn-flat white-text right" onClick={this.updateProject}>Update</button>
            </div>
        )
    }
};

export default withRouter(ProjectForm);