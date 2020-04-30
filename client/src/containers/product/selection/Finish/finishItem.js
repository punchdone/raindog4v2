import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';
import Card from './card';

class FinishItem extends Component {

    state = {
        showWood: false
    }

    updateShowWood = this.updateShowWood.bind(this);
    removeMaterial = this.removeMaterial.bind(this);

    updateShowWood() {
        alert('click worked!', this.state.showWood);
        this.setState(prevState => ({ showWood: !prevState.showWood }));
    }

    removeMaterial(finishId, materialId) {
        console.log('[removeMaterial] finishId = ', finishId);
        alert('remove material at the finish item level for '+finishId+'/'+materialId);
        this.props.removeMaterial(finishId, materialId);
    }

    // async addWood(val) {
    //     console.log('[addWood] val = ', val);
    //     const finish = await axios.post('/api/products/selections/finishes/'+this.props._id+'/materials');

    // }

    render() {

        const woodList = this.state.showWood ? 
            <Card {...this.props} 
                materialSelections={this.props.materialSelections}
                addMaterial={this.props.addMaterial}
                removeMaterial={this.removeMaterial}
                finishId={this.props._id} /> 
            : null;

        return (
            <li className="collection-item">
                <span style={{ textTransform: 'capitalize' }}>{this.props.title}</span>  (<i>{this.props._id}</i>)
                <button 
                    className="btn-small btn-flat grey white-text"
                    style={{ margin: '0 0 5px 5px' }}
                    onClick={() => this.props.onDeleteFinish(this.props._id)}>
                        Delete
                </button>
                <button
                    className="btn-small btn-flat blue white-text"
                    style={{ margin: '0 0 5px 5px' }}
                    onClick={() => this.updateShowWood()}
                >
                    Materials
                </button>
                {woodList}
            </li>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteFinish: (finishId) => dispatch(actions.removeFinish(finishId))
    }
}

export default connect(null, mapDispatchToProps)(FinishItem);