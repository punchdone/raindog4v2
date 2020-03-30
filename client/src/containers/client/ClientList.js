import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClients } from '../../store/actions';
import axios from 'axios';

import ClientCard from '../../components/client/clientCard';

class ClientList extends Component {

    state = {
        clients: [],
        showSamples: false
    };

    async componentDidMount() {
        await this.props.fetchClients();
        this.setState({ clients: this.props.clients.reverse() });
        console.log('[componentDidMount] clients = ', this.state.clients);
        // console.log('[componentDidMount] showSamples = ', this.state.showSamples);
    }

    clientDeleteHander(id) {
        // alert('Time to delete this record: ' + id);
        // console.log(id);
        // console.log('[clientDeleteHander] before this.props.clients = ', this.props.clients);
        axios.delete('/api/clients/' + id)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        const remainder = this.state.clients.filter(client => client._id !== id);
        console.log('[clientDeleteHander] after remainder = ', remainder);
        console.log('[clientDeleteHandler] before setStatethis.state.clients = ', this.state.clients);
        this.setState({ clients: remainder });
        
        console.log('[clientDeleteHandler] after setState this.state.clients = ', this.state.clients);
    }

    // async exampleClickHander() {
    //     console.log('[exampleClickHandler] before showSamples = ', this.state.showSamples);
    //     await this.setState({ showSamples: !this.state.showSamples });
    //     this.exampleClickHander.bind(this);
    //     console.log('[exampleClickHandler] after showSamples = ', this.state.showSamples);
    // }

    renderClients() {
        console.log('[App.js] this.props.clients = ', this.state.clients)
        return this.state.clients.map(client => {
            return(
                <ClientCard 
                    key={client._id}
                    name={client.name}
                    clientId={client._id}
                    createdDate={client.createdDate}
                    onClickDelete={() => this.clientDeleteHander(client._id)}
                />
            )
        })
    }
    render() {
        return (
            <div>
                {this.renderClients()}
            </div>
        )
    }
}

function mapStateToProps({ clients }) {
    console.log('[mapStateToProps] clients = ', clients);
    return { clients };
}

export default connect(mapStateToProps, { fetchClients })(ClientList);