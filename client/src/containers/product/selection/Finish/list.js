import React, { Component } from 'react';
import { connect } from 'react-redux';

import Item from './item';
import * as actions from '../../../../store/actions';

class List extends Component {

    removeMaterial(finishId, materialId) {
        this.props.onDeleteFinishMaterial(finishId, materialId);
    }

    renderWoods() {
        if(this.props.materials) {
            return this.props.materials.map((material, index ) => {
                return (
                    <li>
                        <Item 
                            key={material._id} 
                            {...material} 
                            finishId={this.props._id} 
                            removeMaterial={this.removeMaterial.bind(this)} />
                    </li>
                )
            })
        }
    };

    
    render() {
        console.log('this.props = ', this.props);
        return (
            <div>
                <h5><span>This is the materials list!</span></h5>
                <ul>{this.renderWoods()}</ul>
            </div>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteFinishMaterial: (finishId, materialId) => dispatch( actions.removeFinishMaterial(finishId, materialId))
    }
}

export default connect(null, mapDispatchToProps)(List);