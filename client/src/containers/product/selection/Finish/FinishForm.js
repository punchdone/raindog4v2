import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import FinishItem from './finishItem';
import FinishAddForm from './FinishAddForm';
import Spinner from '../../../../components/UI/Spinner/Spinner';

class FinishForm extends Component {
    
    // state = {
    //     finishes: {},
    //     finishTypes: [],
    //     stocking: [],
    //     materialSelections: []
    // }
    // addFinish = this.addFinish.bind(this);
    // removeFinish = this.removeFinish.bind(this);
    // addMaterial = this.addMaterial.bind(this);
    // removeMaterial = this.removeMaterial.bind(this);
   
    async componentDidMount() {
        this.props.onFetchFinishes();
        this.props.onFetchFinishTypes();
        this.props.onFetchStockLevels();
        this.props.onFetchMaterials();
        //const finishes = await axios.get('/api/products/selections/finishes');
        // const finishTypes = await axios.get('/api/products/selections/finishTypes');
        // const stocking = await axios.get('/api/products/selections/stocking');
        // const materialSelections = await axios.get('/api/products/selections/materials');
        // //this.setState({ finishes: finishes.data, finishTypes: finishTypes.data, stocking: stocking.data, materialSelections: materialSelections.data });
        // console.log('[componentDidMount] this.state = ', this.state);
    }

    // async addFinish(val) {
    //     console.log('[addFinish] val = ', val);
    //     const finish = await axios.post('/api/products/selections/finishes', val);
    //     let finishes =[...this.state.finishes];
    //     finishes.push(finish.data);
    //     await this.setState({ finishes });
    // }

    // async removeFinish(id) {
    //     await axios.delete('/api/products/selections/finishes/'+id);
    //     const finishes = [...this.state.finishes];
    //     const revFinishes = finishes.filter(finish => finish._id !== id);
    //     await this.setState({ finishes: revFinishes });
    // }

    // async addMaterial(finishId, val) {
    //     const material = await axios.put('/api/products/selections/finishes/'+finishId+'/materials', val);
    //     const finishes = [...this.state.finishes];
    //     let elementPos = finishes.map(finish => {
    //         return finish._id
    //     }).indexOf(finishId);
    //     finishes[elementPos].materials.push(material.data);
    //     this.setState({ finishes });
    // }

    // async removeMaterial(finishId, materialId) {
    //     console.log('[removeMaterial] materialId = ', materialId);
    //     axios.delete('/api/products/selections/finishes/'+finishId+'/materials/'+materialId);
    //     const finishes = [...this.state.finishes];
    //     let elementPos = finishes.map(finish => {
    //         return finish._id
    //     }).indexOf(finishId);
    //     console.log('[removeMaterial] this.state.finishes = ', this.state.finishes);
    //     let materials = [...this.state.finishes[elementPos].materials];
    //     console.log('[removeMaterials] before materials = ', materials);
    //     let newMaterials = materials.filter(material => material._id !== materialId);
    //     console.log('[removeMaterial] after materials = ', newMaterials);
    //     materials = newMaterials;
    //     await this.setState({ materials });
    //     console.log('[removeMaterial] this.state.finishes = ', this.state.finishes);

        // console.log('[removeMaterial] elementPos = ', elementPos)
        // console.log('[removeMaterial] before finishes[elementPos].materials = ', finishes[elementPos].materials);
        // const bunchCrap = finishes[elementPos].materials;
        // console.log('[removeMaterial] bunchCrap = ', bunchCrap);
        // const newCrap = bunchCrap.filter(crap => crap._id !== materialId);
        // console.log('[removeMaterial] newCrap = ', newCrap);
        // const newFinishes = finishes[elementPos].materials.filter(material => material._id !== materialId);
        // console.log('[removeMaterial] after finishes[elementPos].materials = ', newFinishes);
        // this.setState({ finishes: { elementPos: { materials: newFinishes } } });
    // }

    // renderFinishes() {
    //     if(this.props.finishes) {
    //         this.props.finishes.map(finish => {
    //             return (
    //                 <FinishItem 
    //                     key={finish._id}
    //                     {...finish}
    //                     materialSelections={this.props.materials}
    //                     removeFinish={this.removeFinish}
    //                     addMaterial={this.addMaterial}
    //                     removeMaterial={this.removeMaterial}
    //                  />
    //             )
    //         })
    //     }
    // }

    render() {
        console.log('this.props.finishes = ', this.props.finishes);
        console.log('this.props.finishTypes = ', this.props.finishTypes);
        console.log('this.props.stockLevels = ', this.props.stockLevels);
        console.log('this.props.materials = ', this.props.materials);
        // console.log('this.state.finishTypes = ', this.state.finishTypes);

        let finishes = <Spinner />;
        if ( !this.props.loading ) {
            finishes = this.props.finishes.map( finish => (
                <FinishItem
                    key={finish._id}
                    {...finish}
                    materialSelections={this.props.materials}
                 />
            ) )
        }

        return (
            <div>
                <h5><span>Finish Listing</span></h5>
                <ul className="collection">
                    {finishes}
                    { !this.props.loading && <FinishAddForm 
                        addFinish={this.addFinish} 
                        finishTypes={this.props.finishTypes}
                        stocking={this.props.stockLevels} />
                    }           
                </ul>
            </div>
            
        )
    }
};

const mapStateToProps = state => {
    return {
        finishes: state.finishes.finishes,
        loading: state.finishes.loading,
        finishTypes: state.selections.finishTypes,
        stockLevels: state.selections.stockLevels,
        materials: state.selections.materials
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchFinishes: () => dispatch(actions.fetchFinishes()),
        onFetchFinishTypes: () => dispatch(actions.fetchFinishTypes()),
        onFetchStockLevels: () => dispatch(actions.fetchStockLevels()),
        onFetchMaterials: () => dispatch(actions.fetchMaterials())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishForm);