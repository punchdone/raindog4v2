import React, { Component } from 'react';

class NameItem extends Component {

    nameHandler = event => {
        event.preventDefault();
        console.log('[nameHandler] name = ', this.props.name);
        this.props.updateOnClick(this.props.name);
    }

    renderName(){
        if(this.props.edit === true){
            return(
                <div>
                    <span className="card-title">
                        <input type="text" 
                            value={this.props.name}
                            onChange={this.props.changeHandler}
                         />
                     </span>
                    <button className="btn-small btn-flat grey white-text" onClick={this.nameHandler}>Update</button>
                    <p>Client ID: {this.props.clientId}</p>
                </div>
            ) 
        } else {
            return (
                <div>
                    <span className="card-title">{this.props.name}</span>
                    <button className="btn-small btn-flat grey white-text" style={{ margin: "0 0 0 20px" }} onClick={() => this.props.editOnClick()}>Edit</button>
                    <p>Client ID: {this.props.clientId}</p>
                </div>
            )
        }
    }
    
    render() {
        return (
            <div>
                {this.renderName()}
            </div>
        )
    }
};

export default NameItem;