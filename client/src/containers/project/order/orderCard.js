import React from 'react';
import { Link } from 'react-router-dom';

const orderCard = ({ clientId, roomId }) => (
    <div>
        <p>Your list of orders!</p>
        <Link 
            to={`/projects/${clientId}/rooms/${roomId}/orders/new`} 
            className="btn-flat green white-text" 
            style={{ margin: '0 0 10px 0' }}>
                Add Order
        </Link>
    </div>
);

export default orderCard;