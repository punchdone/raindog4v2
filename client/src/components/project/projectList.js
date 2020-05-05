import React from 'react';
import { Link } from 'react-router-dom';
import ClientList from '../../containers/client/ClientList';

const projectsList = () => {
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
};

export default projectsList;