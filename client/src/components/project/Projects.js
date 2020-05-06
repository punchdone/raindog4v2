import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions';
import Spinner from '../UI/Spinner/Spinner';
import ProjectList from './projectList';
import ClientList from '../../containers/client/ClientList';

class Projects extends Component {

    componentDidMount() {
        this.props.onFetchProjects();
    }



    render() {

        // let list = <Spinner />;

        // if(!this.props.loading) {
        //     list = <ProjectList
        //         projects={this.props.projects}
        //      />;
        // };

        return (
            <div>
                <h5>Project List</h5>
                <Link
                    className="btn-flat btn-large green white-text"
                    to="/projects/new">
                        Add Project<i className="material-icons">add</i>
                </Link>
                <ClientList />
                <div className="fixed-action-btn">
                    <Link to="/projects/new" className="btn-floating btn-large green">
                        <i className="material-icons">add</i>
                    </Link>
                </div>
            </div>
        );

    }
    
};

const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
        loading: state.projects.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchProjects: () => dispatch(actions.fetchProjects())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);