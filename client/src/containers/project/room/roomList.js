import React, { Component } from 'react';

import RoomItem from './roomItem';

class RoomList extends Component {
    
    renderRooms() {
        if(this.props.rooms) {
            return this.props.rooms.map((room, index) => {
                return (
                    <RoomItem key={room._id} {...room} clientId={this.props.clientId} />
                )
            })
        }
    };

    render() {
        console.log('this.props = ', this.props);
        return (
            <div>
                <div className="row">
                    <div className="card darken-1" >
                        <div className="col s6">
                            <b>Room/Specification Group</b>
                        </div>
                        <div className="col s2">
                            <b>Order Type</b>
                        </div>
                        <div className="col s2">
                            <b>Order State</b>
                        </div>
                </div>
                </div>
                {this.renderRooms()}
                <div>
                    <div className="card darken-1">
                        <div className="card-title center">
                            Add Room
                        </div>
                        <div className="card-content center">
                                <button 
                                    onClick={() => this.props.updateShowRoom()} 
                                    className="green btn-floating btn-large white-text center">
                                        <i className="material-icons">add</i>
                                    </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default RoomList;

