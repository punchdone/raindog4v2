import React, { Component } from 'react';

import OrderCard from '../order/orderCard';

class RoomItem extends Component {

    state = {
        showOrders: false
    }
    updateShowOrders = this.updateShowOrders.bind(this);


    updateShowOrders() {
        alert('This did click!');
        // console.log('[updateShowOrders] before showOrders = ', this.state.showOrders);
        let prevState = {...this.state};
        let newShowOrders = !prevState.showOrders
        this.setState({ showOrders: true });
        // console.log('[updateShowOrders] after showOrders = ', this.state.showOrders);
    }

    render() {

        // console.log('this.state.showOrders = ', this.state.showOrders);
        console.log('RoomId this.props._id = ', this.props._id);
        console.log('this.props.clientId = ', this.props.clientId);
        return (
            <div className="row">
                <div className="card darken-1" style={{ height: '50px' }}>
                    <div className="col s6">
                        {this.props.name}
                    </div>
                    <div className="col s2">
                        {this.props.type}
                    </div>
                    <div className="col s2">
                        {this.props.state}
                    </div>
                    <div className="col s2">
                        <button 
                            onClick={() => this.updateShowOrders()}
                            className="btn-small btn-flat blue white-text">
                                Orders
                                <i className="material-icons">add</i>
                        </button>
                    </div>
                </div>
                <div className="card darken-2">
                    {this.state.showOrders && <OrderCard clientId={this.props.clientId} roomId={this.props._id} />}
                </div>
            </div>
        )
    }
    
    
};

export default RoomItem;