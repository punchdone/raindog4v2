import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import SampleCard from '../sample/sampleCard';
import NameItem from './nameItem';

class ClientCard extends Component {

    state = {
        name: this.props.name,
        showSamples: false,
        editName: false
    }
    editNameHandler = this.editNameHandler.bind(this);
    nameChangeHandler = this.nameChangeHandler.bind(this);
    updateNameHandler = this.updateNameHandler.bind(this);

    sampleClickHandler = async () => {
        // console.log('[exampleClickHandler] before showSamples = ', this.state.showSamples);
        await this.setState({ showSamples: !this.state.showSamples });
        this.sampleClickHandler.bind(this);
        // console.log('[exampleClickHandler] after showSamples = ', this.state.showSamples);
        const samples = await axios.get('/api/projects/'+this.props.clientId+'/samples');
        // console.log('[exampleClickHandler] samples = ', samples);
    }

    editNameHandler() {
        this.setState(prevState => ({ editName: !prevState.editName }));
    }

    nameChangeHandler(e) {
        e.preventDefault();
        console.log('[nameChangeHandler] event = ', e);
        this.setState({ name: e.target.value });
    }

    updateNameHandler(val) {
        axios.put('/api/projects/'+this.props.clientId, { 'name': val });
        this.setState({ editName: false });
    }

    render() {
        const editLink = '/projects/' + this.props.clientId;
        const clientId = this.props.clientId;
        console.log('this.props.name = ', this.props.name);
        // console.log('[clientCard] clientId = ', clientId);
        return (
            <div className="card darken-1">
                    <div className="card-content">
                        <NameItem 
                            editOnClick={this.editNameHandler}
                            updateOnClick={this.updateNameHandler}
                            changeHandler={this.nameChangeHandler}
                            edit={this.state.editName}
                            clientId={this.props.clientId}
                            name={this.state.name}
                        />
                        <div className="card-action">
                            <button className="blue btn-flat white-text ml-5" onClick={this.sampleClickHandler}>
                                Samples
                            </button>
                            <Link to={`/projects/${this.props.clientId}`} className="green btn-flat white-text" style={{ margin: '0px' }}>
                                Projects
                            </Link>
                            <Link to={`/projects/${this.props.clientId}/contact`} className="purple btn-flat white-text" style={{ margin: "0px" }}>
                                Contact
                            </Link>
                            <button className="red btn-flat white-text" onClick={() => this.props.onClickDelete()}>
                                Delete
                            </button>
                            <Link to="samples/list" className="orange btn-flat white-text">
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