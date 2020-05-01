export const sampleFinishForm = {
    material: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Material/Wood Species'
        },
        label: 'Material/Wood',
        value: '',
        valid: true
    },
    finish: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Finish'
        },
        label: 'Finish',
        value: '',
        valid: true
    }
};

export const sampleDoorForm = {
    material: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Material/Wood Species'
        },
        label: 'Material/Wood',
        value: '',
        valid: true
    },
    finish: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Finish'
        },
        label: 'Finish',
        value: '',
        valid: true
    },
    doorName: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Door Name'
        },
        label: 'Door Name',
        value: '',
        valid: true
    },
    doorConstruction: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Door Construction'
        },
        label: 'Door Construction',
        value: '',
        valid: true
    },
    doorOE: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Door Outside Edge Profile'
        },
        label: 'Door OE',
        value: '',
        valid: true
    },
    doorIE: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Door Inside Edge Profile'
        },
        label: 'Door IE',
        value: '',
        valid: true
    },
    doorPNL: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Door Panel Profile'
        },
        label: 'Door PNL',
        value: '',
        valid: true
    },
    doorStileWidth: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Door Stile & Rail Width(s)'
        },
        label: 'Door Stile & Rail Width',
        value: '',
        valid: true
    }
};

export const orderHeaderForm = {
    material: {
        elementType: 'select',
        elementConfig: {
            type: 'select',
            options: [
                { value: 'maple', displayValue: 'Maple' }
            ]
        },
        label: 'Material/Wood',
        value: '',
        valid: true
    },
    finish: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Finish'
        },
        label: 'Finish',
        value: '',
        valid: true
    }
};

export const selectionForm = {
    selection: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Selection'
        },
        label: 'Selection',
        value: '',
        valid: true
    }
};

export const finishForm = {
    title: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Finish'
        },
        label: 'Finish Name',
        value: '',
        valid: true
    },
    finishType: {
        elementType: 'select',
        elementConfig: {
            type: 'type',
            options: []
        },
        label: 'Finish Type',
        value: '',
        valid: true
    },
    stocking: {
        elementType: 'select',
        elementConfig: {
            type: 'stocking',
            options: []
        },
        label: 'Stocking Category',
        value: '',
        valid: true
    }
};

export const finishMaterialForm = {
    materials: {
        elementType: 'select',
        elementConfig: {
            type: 'material',
            options: []
        },
        label: 'Material/Wood',
        value: '',
        valid: true
    }
};

export const productForm = {
    type: {
        elementType: 'select',
        elementConfig: {
            options: []
        },
        label: 'Cabinet Type',
        value: '',
        valid: true
    },
    configuration: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Configuration Code'
        },
        label: 'Configuration Code',
        value: '',
        valid: true
    },
    title: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Cabinet Title'
        },
        label: 'Cabinet Name',
        value: '',
        valid: true
    },
    widthmin: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Min Width'
        },
        label: 'Width Minimum',
        value: 0,
        valid: true
    },
    widthmax: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Max Width'
        },
        label: 'Width Maximum',
        value: 0,
        valid: true
    },
    widthstd: {
        elementType: 'input',
        elementConfig: {
            type: 'number',
            placeholder: 'Std Width'
        },
        label: 'Width Standard',
        value: 0,
        valid: true
    },
    widthfix: {
        elementType: 'checkbox',
        elementConfig: {},
        label: 'Width Fixed',
        value: false,
        valid: true
    }
};
