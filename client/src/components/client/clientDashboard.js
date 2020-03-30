import React from 'react';
import { Link } from 'react-router-dom';
import ClientList from '../../containers/client/ClientList';

const clientDashboard = () => {
    return (
        <div>
            <h3>Sample Checkout List</h3>
            <ClientList />
            <div className="fixed-action-btn">
                <Link to="/projects/new" className="btn-floating btn-large green">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        </div>
    );
};

export default clientDashboard;