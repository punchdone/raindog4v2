import React, { Component } from 'react';

class sampleItem extends Component {




    displayFields() {
        if( this.props.type === 'finish') {
            return (
                <div>
                    <span style={{ textTransform: 'capitalize' }}>{this.props.type}</span> : {this.props.material} - {this.props.finish}
                    <button className="btn-small btn-flat grey white-text" style={{ margin: "0px 0px 5px 20px" }} onClick={this.props.onDelete}>
                        Delete
                    </button>
                </div>
            )
        } else if (this.props.type === 'door') {
            return (
                <div>
                    <span style={{ textTransform: 'capitalize' }}>{this.props.type}</span> : {this.props.doorName}, {this.props.material} - {this.props.finish} ({this.props.doorConstruction} {this.props.doorStileWidth} OE:{this.props.doorOE} IE:{this.props.doorIE} PNL:{this.props.doorPNL})
                    <button className="btn-small btn-flat grey white-text" style={{ margin: "0px 0px 5px 20px" }} onClick={this.props.onDelete}>
                        Delete
                    </button>
                </div>
            )
        }
    };

    render() {

        return(
            <div>
                <li style={{ margin: "0 0 5px 0" }}>
                    {this.displayFields()}
                </li>
            </div>
        )
    }
};

export default sampleItem;