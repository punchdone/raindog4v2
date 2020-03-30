import React, { Component } from 'react';
import axios from 'axios';


import SampleList from './SampleList';
import SampleForm from '../../containers/sample/SampleForm';

class SampleCard extends Component {

    state = {
        samples: [],
        clientId: this.props.id
    };
    addSample = this.addSample.bind(this);
    removeSample = this.removeSample.bind(this);

    async componentDidMount() {
        const sampleList = await axios.get('/api/clients/'+this.props.id+'/samples');
        this.setState({ samples: sampleList.data });
        console.log('[componentDidMount] this.state.samples = ', this.state.samples);
    };

    addSample(val) {
        console.log('[addSample] val = ', val);
        // const type = this.state.type;
        // const material = this.state.material;
        // const finish = this.state.finish;
        // alert('This is the sample: ' + type + ':' + material +'/' + finish);
        axios.post('/api/clients/'+this.state.clientId+'/samples', val)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        this.setState({ samples: [...this.state.samples, val]});
        console.log('[addSample] this.state.samples = ', this.state.samples);
    }

    removeSample(sampleId) {
        console.log('[removeSample] sampleId = ', sampleId);
        console.log('[removeSample] clientId = ', this.state.clientId);
        axios.delete('/api/clients/'+this.state.clientId+'/samples/'+sampleId)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        const newSamples = this.state.samples.filter(sample => sample._id !== sampleId);
        this.setState({ samples: newSamples });
    }

    render() {
        const clientId = this.props.id;
        return (
            <div>
                <p>Samples for: {clientId}</p>
                <SampleList 
                    clientId={clientId}
                    samples={this.state.samples} 
                    removeSample={this.removeSample} 
                />
                <SampleForm 
                    clientId={clientId}
                    addSample={this.addSample}
                />
            </div>
        );
    };
};

export default SampleCard;