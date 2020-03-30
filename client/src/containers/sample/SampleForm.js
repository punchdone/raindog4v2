import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

class SampleForm extends Component {

    state = {
        type: '',
        material: '',
        finish: ''
    };
    handleMaterialChange = this.handleMaterialChange.bind(this);
    handleFinishChange = this.handleFinishChange.bind(this);
    handleTypeChange = this.handleTypeChange.bind(this);
    onSubmit = this.onSubmit.bind(this);
    // handleSampleFormSubmit = this.handleSampleFormSubmit.bind(this);
    
    handleMaterialChange(event) {
        this.setState({ material: event.target.value });
    }

    handleFinishChange(event) {
        this.setState({ finish: event.target.value });
    }

    handleTypeChange(event) {
        this.setState({ type: event.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log('[onSubmit] e.target.type.value = ', e.target.type.value);
        console.log('[onSubmit] this.state = ', this.state);
        this.props.addSample(this.state);
        this.setState({ type: '' });
        this.setState({ material: '' });
        this.setState({ finish: '' });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label>Type</label>
                <select value={this.state.type} name="type" defaultValue={this.state.type} style={{ 'display': 'inline-block' }} onChange={this.handleTypeChange}>
                    <option value="" disabled>Choose your option</option>
                    <option value="finish">Finish</option>
                    <option value="door">Door</option>
                </select>
                <label>Material</label>
                <input text="text" value={this.state.material} onChange={this.handleMaterialChange} />
                <label>Finish</label>
                <input text="text" value={this.state.finish} onChange={this.handleFinishChange} />
                <button type="submit" className="teal btn-flat white-text">
                    Submit
                </button>
            </form>
        )
    }
};

export default reduxForm({
    form: 'sampleForm',
})(SampleForm);