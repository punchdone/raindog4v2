import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SampleCompleteList extends Component {

    state = {
        samples: []
    };

    async componentDidMount() {
        const sampleList = await axios.get('/api/samples');
        this.setState({ samples: sampleList.data });
        console.log('[componentDidMount] this.state.samples = ', this.state.samples);
    };

    renderSamples() {
        console.log('[renderSamples] this.state.samples = ', this.state.samples)
        return this.state.samples.map(sample => {
            return (
                <li><span style={{ textTransform: 'capitalize' }}>{sample.type}</span>: {sample.material}-{sample.finish}</li>
            )
        })
    }

    render() {

        return (
            <div>
                <h2>Samples Checked Out List</h2>
                <ol>
                    {this.renderSamples()}
                </ol>
                <div className="fixed-action-btn">
                    <Link to="/" className="btn-floating btn-large green">
                        <i className="material-icons">home</i>
                    </Link>
                </div>
            </div>
        );
    };
};

export default SampleCompleteList;