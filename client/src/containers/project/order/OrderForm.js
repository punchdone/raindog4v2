import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import HeaderForm from './HeaderForm';
import Card from '../../../shared/card';

class OrderForm extends Component {

    state = {
        order: {
            lines: []
        },
        newOrder: false,
        showOrderLineForm: false
    }
    updateShowOrderLine = this.updateShowOrderLine.bind(this);

    async componentDidMount() {
        if(this.props.match.params.orderId === 'new') {
            await this.setState({ newOrder: true });
        } else {
            const order = await axios.get('/api/projects/' + this.props.match.params.projectId + '/rooms/' + this.props.match.params.roomId + '/orders/' + this.props.match.params.orderId);
            this.setState({ order });
        }
    }

    updateShowOrderLine() {
        this.setState(prevState => ({ showOrderLineForm: !prevState.showOrderLineForm }));
    }

    async addOrderLine(val) {
        const line = await axios.post('/api/project/rooms/orders/lines', val);
        let order = {...this.state.order}
        order.lines.push(line.data);
        this.setState({ order, showOrderLineForm: false });
    }

    renderButtons() {
        if(!this.state.newOrder) {
            return (
                <div>
                    <Link 
                        to={`/projects/${this.props.match.params.projectId}`}
                        className="red btn-flat white-text left"
                    >
                        Cancel
                    </Link>
                    <button
                        className="green btn-flat white-text right"
                        onClick={this.updateOrder}
                    >
                        Update
                    </button>
                </div>
            )
        } else {
            return (
                <div>
                    <Link 
                        to={`/projects/${this.props.match.params.projectId}`}
                        className="red btn-flat white-text left"
                    >
                        Cancel
                    </Link>
                    <button
                        className="green btn-flat white-text right"
                        onClick={() => this.submitOrder()}
                    >
                        New Order
                    </button>
                </div>
                
            )
        }
    }

    render() {
        console.log('this.props.match.params = ', this.props.match.params);
        console.log('this.state = ', this.state);
        return (
            <div>
                 <h3>This is the order form!</h3>
                 <HeaderForm />
                 <Card
                    items={this.state.order.lines}
                    addItem={this.addOrderLine}
                    removeItem={this.removeOrderLine}
                    showForm={this.state.showOrderLineForm}
                    updateShowItem={this.updateShowOrderLine}
                  />
                 {this.renderButtons()}
            </div>
           
        )
    }
};

export default OrderForm;