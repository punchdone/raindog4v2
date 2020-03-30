import React, { Component } from 'react';

import SampleItem from '../../components/sample/sampleItem';

class SampleList extends Component {

    // state = {
    //     samples: []
    // }
    
    // async componentWillMount() {
    //     await this.props.fetchSamples(this.props.clientId);
    //     const samples = await axios.get('/api/clients/'+this.props.id+'/samples');
    //     this.setState({ samples });
    //     console.log('[sampleCard] samples = ', samples);
    // }

    removeSample(id) {
        console.log('[removeSample] id = ', id);
        this.props.removeSample(id);
    }

    renderSamples() {
        console.log('[renderSamples] this.state.samples = ', this.props.samples);
        return this.props.samples.map(sample => {
            return (
                <SampleItem key={sample._id} {...sample} onDelete={this.removeSample.bind(this, sample._id)} />
            )
        })
    }
    
    render() {
        console.log('[SampleList] clientId = ', this.props.clientId);
        console.log('[SampleList] samples = ', this.props.samples);
        return (
            <div>
                <ul>
                    {this.renderSamples()}
                </ul>
            </div>
        )
    }
};

export default SampleList; 

