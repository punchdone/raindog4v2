import React from 'react';

import RoomList from './roomList';
import RoomForm from './RoomForm';

const roomCard = (props) => {
    const form = props.showRoom ? <RoomForm addRoom={props.addRoom} /> : null;
    return(
        <div>
            <h5><span>Rooms</span></h5>
            <RoomList 
                clientId={props.clientId}
                updateShowRoom={props.updateShowRoom}
                rooms={props.rooms} />
            {form}
        </div>
    )
};

export default roomCard;