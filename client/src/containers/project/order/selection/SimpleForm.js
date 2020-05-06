import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../../../store/actions';
import SimpleSelectionForm from './SimpleSelectionForm';
import SimpleConfirm from './SimpleConfirm';
import Spinner from '../../../../components/UI/Spinner/Spinner';

class SelectionForm extends Component {

    state = {
        order: [],
        step: 1
    }
    handleSelect = this.handleSelect.bind(this);

    async componentDidMount() {
        this.props.onFetchSelections();
        this.props.onFetchFinishes();
        // const selections = await axios.get('/api/products/selections');
        // await this.setState({ selections: selections.data });
    }

    nextStep() {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }

    prevStep() {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    // handleChange = input => e => {
    //     this.setState({ order[input]: e.target.vallue });
    // }

    async handleSelect(type, id, selection) {
        console.log('[handleSelect] type = ', type);
        console.log('[handleSelect] id = ', id);
        const orderDetail = {[type]: id, selection: selection};
        let order = [...this.state.order];
        order.push(orderDetail);
        await this.setState({ order });
        this.nextStep();
        console.log('[handleSelect] orderDetail = ', orderDetail);
        // let orderDetail = {...this.state.order};
        // orderDetail.push({ type: })
        console.log('[handleSelect] order = ', order);
        // this.setState({ order[type]: id });
        console.log('[handleSelect] this.state = ', this.state);
    }

    // renderWoodSelections() {
    //     console.log('this.state.selections = ', this.state.selections);
    //     if(Object.entries(this.state.selections).length !== 0) {
    //         const woodSelections = this.state.selections.filter(selection => selection.type === 'wood');
    //         console.log('woodSelections = ', woodSelections);
    //         this.setState({ woodSelections });
    //     };
    //     if(this.state.showMaterial) {
    //         return (
    //             <MaterialSelectionForm selections={this.state.woodSelections} />
    //         )
    //     }
    // }

    selectionConfirm = () => {
        console.log('[selectionConfirm] this.state.order = ', this.state.order);
        console.log('[selectionConfirm] ', Object.assign({}, ...this.state.order));

        // const orderDetails = this.state.order.map(i => i.slice(0,1))
        this.props.onAddOrder(Object.assign({}, ...this.state.order));
        this.props.history.push('/products');
    }

    render() {

        const { step, order } = this.state;
        console.log('order = ', order);
        let woodId = '';
        if (order.length >= 3) {
            woodId = order[2].wood;
        };
        console.log('woodId = ', woodId)
        console.log('this.props.selections = ', this.props.selections);
        const finishes = this.props.finishes;
        let specificFinishes = finishes.filter(finish => finish.materials.some(material => material._id === woodId))
            .map(finish => ({ selection: finish.title, _id: finish._id }));
            // .map(finish => {
            //     return Object.assign({}, finish, {materials: finish.materials.filter(material => material._id == woodId)})
            // });
        console.log('finishes = ', finishes);
        console.log('orderwood = ', order.wood);
        console.log('specificFinishes = ', specificFinishes);

        let form = <Spinner />;

        if ( !this.props.loading ){
            switch (step) {
                case 1:
                    return (
                        form = <SimpleSelectionForm
                            nextStep={this.nextStep}
                            type="door"
                            formTitle="Door Selection"
                            selections={this.props.selections.filter(selection => selection.type === 'door')}
                            onSelect={this.handleSelect}
                        />
                    );
                case 2:
                    return (
                        form = <SimpleSelectionForm
                            prevStep={this.prevStep}
                            nextStep={this.nextStep}
                            type="topDF"
                            formTitle="Top Drawer Head"
                            selections={this.props.selections.filter(selection => selection.type === 'topDF')}
                            onSelect={this.handleSelect}
                            />
                    )
                case 3:
                    return (
                        form = <SimpleSelectionForm
                            prevStep={this.prevStep}
                            nextStep={this.nextStep}
                            type="wood"
                            formTitle="Material/Wood"
                            selections={this.props.selections.filter(selection => selection.type === 'wood')}
                            onSelect={this.handleSelect}
                            />
                    )
                case 4:
                    return (
                        form = <SimpleSelectionForm
                            prevStep={this.prevStep}
                            nextStep={this.nextStep}
                            type="interior"
                            formTitle="Interior Material Selection"
                            selections={this.props.selections.filter(selection => selection.type === 'interior')}
                            onSelect={this.handleSelect}
                            />
                    )
                case 5:
                    return (
                        form = <SimpleSelectionForm
                            prevStep={this.prevStep}
                            nextStep={this.nextStep}
                            type="finish"
                            formTitle="Finish Selection"
                            selections={specificFinishes}
                            onSelect={this.handleSelect}
                            />
                    )
                case 6: 
                    return (
                        form = <SimpleConfirm 
                            prevStep={this.prevStep}
                            orderHeader={order} 
                            orderSubmit={this.selectionConfirm}
                         />
                    )
                default:
                    return (
                        <Spinner />
                    )
            }
        }
        
        return (
            <div>
                {form}
            </div>
        )

        // console.log('this.state.selections = ', this.state.selections);
        // let selections = {...this.state.selections};
        // console.log('selections = ', selections);
        // let doorSelection = this.state.selections.filter(selection => selection.type === 'door');
        // console.log('doorSelection = ', doorSelection);

        // if (this.state.showDoor) {
        //     const doorSelections = Object.keys(this.state.selections)
        //         .filter((key, _id, selection) => this.state.selections[key].type === 'door');
        //     console.log('doorSelections = ', doorSelections);
            
            // const doorSelections = selections.filter(selection => selection.type === 'door');
            // console.log('doorSelections = ', doorSelections);
        // }
        
        // return (
        //     <div>
        //         <h5>Simple Selection Sheet</h5>
        //         {this.state.showDoor && <DoorSelectionForm formTitle="Door Selections" selections={this.state.selections.filter(selection => selection.type === 'door')} />}
        //         {this.state.showMaterial && <MaterialSelectionForm formTitle="Materia/Wood Selections" selections={this.state.selections.filter(selection => selection.type === 'wood')} />}
        //     </div>
        // )
    }

};

const mapStateToProps = state => {
    return {
        selections: state.selections.selections,
        finishes: state.finishes.finishes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSelections: () => dispatch(actions.fetchSelections()),
        onFetchFinishes: () => dispatch(actions.fetchFinishes()),
        onAddOrder: (orderDetail) => dispatch(actions.addOrder(orderDetail))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SelectionForm));