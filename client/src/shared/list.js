import React, { Component } from 'react';

import Item from './item';

class List extends Component {

    
    render() {
        console.log('this.props = ', this.props);
        return (
            <div>
                <h5><span>This is the list!</span></h5>
                <ul><Item {...this.props} /></ul>
                <div className="card darken-1">
                    <div className="card-title center">
                        Add Line
                    </div>
                    <div className="card-content center">
                            <button 
                                onClick={() => this.props.updateShowItem()} 
                                className="green btn-floating btn-large white-text center">
                                    <i className="material-icons">add</i>
                                </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default List;