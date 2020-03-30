import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SampleCard from '../sample/sampleCard';

class ClientCard extends Component {

    state = {
        showSamples: false
    }

    sampleClickHandler = async () => {
        alert('Click handler worked!');
        console.log('[exampleClickHandler] before showSamples = ', this.state.showSamples);
        await this.setState({ showSamples: !this.state.showSamples });
        this.sampleClickHandler.bind(this);
        console.log('[exampleClickHandler] after showSamples = ', this.state.showSamples);
        const samples = await axios.get('/api/clients/'+this.props.clientId+'/samples');
        console.log('[exampleClickHandler] samples = ', samples);
    }

    render() {
        const clientId = this.props.clientId;
        // console.log('[clientCard] clientId = ', clientId);
        return (
            <div className="card darken-1">
                    <div className="card-content">
                        <span className="card-title">{this.props.name}</span>
                        <p>Client ID: {this.props.clientId}</p>
                        <div className="card-action">
                            <button className="red btn-flat white-text" onClick={() => this.props.onClickDelete()}>
                                Delete
                            </button>
                            <button className="blue btn-flat white-text ml-5" onClick={this.sampleClickHandler}>
                                Samples
                            </button>
                            <Link to="samples/list" className="purple btn-flat white-text">
                                List
                            </Link>
                        </div>
                        <p className="right">
                            Checked Out: {new Date(this.props.createdDate).toLocaleDateString()}
                        </p>
                        { this.state.showSamples && <SampleCard id={clientId} /> }
                        
                    </div>
                </div>
        )
    }

};

export default ClientCard;