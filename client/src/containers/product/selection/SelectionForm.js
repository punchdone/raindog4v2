import React, { Component } from 'react';
// import { Link } form 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';

import SelectionItem from './selectionItem';
import AddSelectionForm from './AddSelectionForm';

class SelectionForm extends Component {

    state = {
        selections: {}
    }
    addSelection = this.addSelection.bind(this);
    removeSelection = this.removeSelection.bind(this);

    async componentDidMount() {
        const selections = await axios.get('/api/products/selections');
        this.setState({ selections: selections.data });
        console.log('[componentDidMount] selections = ', this.state.selections);
    }

    handleFieldChange = async (event) => {
        // console.log('[handleFieldChange] event = ', event);
        // const newFilterState = this.state.selections.find((selection) => selection.type === event.value);
        // console.log('[handleFieldChange] newFilterState = ', newFilterState);
        await this.setState({ filterState: event.value });
        console.log('[handleFieldChange] this.state.filterState = ', this.state.filterState);
    }

    async addSelection(val) {
        const selection = await axios.post('/api/products/selections', val);
        // console.log('[addSelection] selection = ', selection.data);
        let selections = [...this.state.selections];
        selections.push(selection.data);
        // console.log('[addSelection] selections = ', selections);
        await this.setState({ selections });
        // console.log('[addSelection] this.state.selections = ', this.state.selections);
    }

    async removeSelection(id) {
        await axios.delete('/api/products/selections/'+id);
        const selections = [...this.state.selections];
        console.log('[removeSelection] selections = ', selections);
        const revSelections = selections.filter(selection => selection._id !== id);
        console.log('[removeSelection] revSelections = ', revSelections);
        await this.setState({ selections: revSelections });
    }

    renderSelections() {
        console.log('[renderSelections] this.state.selections = ', this.state.selections);
        console.log('[renderSelections] this.state.filterState = ', this.state.filterState);

        // const filteredSelections = this.state.selections(selection => selection.type === this.filterState);
        // console.log('[renderSelections] filteredSelections = ', filteredSelections);
        
        if(Object.entries(this.state.selections).length !== 0) {

            const filteredSelections = this.state.selections.filter(selection => selection.type === this.state.filterState);
            console.log('[renderSelections] filteredSelections = ', filteredSelections);

            
            return (
                filteredSelections.map((selection) => {
                    return (
                        <SelectionItem key={selection._id} {...selection} removeSelection={this.removeSelection} />
                    )
                })
                
            )
        }

        // if(Object.entries(this.state.selections).length !== 0) {
        //     return this.state.selections.map((selection, index) => {
        //         return (
        //             <SelectionItem key={selection._id} {...selection} />
        //         )
        //     })
        // }
    };

    render() {

        const options = [
            {value: 'wood', label: 'Wood'},
            {value: 'door', label: 'Door Style' },
            {value: 'topDF', label: 'Top Drawer Head Style'},
            {value: 'interior', label: 'Interiors'},
            {value: 'hardware', label: 'Hardware'},
            {value: 'drawer', label: 'Drawer Box'},
            {value: 'construction', label: 'Construction'},
            {value: 'finishType', label: 'Finish Types'},
            {value: 'stocking', label: 'Stocking Category'},
            {value: 'cabType', label: 'Cabinet Type'},
            {value: 'productLine', label: 'Product Line'}
        ]

        return (
            <div>
                <h5><span>Selection Form</span></h5>
                <Select 
                    name="selectType" 
                    options={options}
                    onChange={this.handleFieldChange} />
                <ul className="collection">
                {this.renderSelections()}
                {this.state.filterState  && <AddSelectionForm type={this.state.filterState} addSelection={this.addSelection} />}
                </ul>
            </div>
        )
    }
}

export default SelectionForm;