import React, { Component } from 'react';

import OrderItem from './orderItem';

class OrderList extends Component {

    renderOrders() {
        if(this.props.orders) {
            return this.props.orders.map((order, index) => {
                return (
                    <OrderIem key={order._id} {...order} />
                )
            })
        }
    }

    render() {
        return (
            <div>
                {this.renderOrders()}
            </div>
        )
    }
};

export default OrderList;