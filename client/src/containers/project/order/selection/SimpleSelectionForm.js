import React, { Component } from 'react';

class SimpleSelectionForm extends Component {

    async handleClick(type, id, selection) {
        console.log('[handleClick] id = ', id);
        this.props.onSelect(type, id, selection);
    };

    render() {

        const list = this.props.selections.map(selection => {
            return(
                <div key={selection._id} className="col m4">
                    <div className="card blue-grey darken-1 small" key={selection._id}>
                        <div className="card-content white-text">
                            <span className="card-title center">{selection.selection}</span>
                            <p>ID: {selection._id}</p>
                        </div>
                        <div className="card-action center">
                            <button 
                                className="btn-flat btn-small green white-text" 
                                style={{ margin: '0 0 5px 10px'}}
                                onClick={() => this.handleClick(this.props.type, selection._id, selection.selection)}    
                            >
                                    Select
                                </button>
                        </div>
                    </div>
                </div>
            ) 
        })

        return(
            <div>
                <h5>{this.props.formTitle}</h5>
                <div className="row">
                    {list}
                </div>
            </div>
        )
    }
};

export default SimpleSelectionForm;