import React, { Component } from 'react';
import Select from 'react-select';

class ProductTest2 extends Component {

    state = {
        value: 'b'
    }
    onChange = this.onChange.bind(this);

    onChange(e) {
        console.log('[onChange] e.value = ', e.value);
        this.setState({ value: e.value });
    }

    render(){

        const options = [
            {value: 'b', label: 'Base'},
            {value: 'w', label: 'Wall'},
            {value: 't', label: "Tall"}
        ]

        return (
            <div className="form-group">
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={options[1]}
                    name="cabType"
                    placeholder="Cabinet Type"
                    options={options}
                    onChange={this.onChange}
                 />
            </div>

        )
    }
};

export default ProductTest2;

