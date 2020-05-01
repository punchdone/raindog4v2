import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Landing from './client/clientDashboard';
import ClientForm from '../containers/client/ClientForm';
import SampleCompleteList from '../containers/sample/SampleCompleteList';
import ProjectForm from '../containers/project/ProjectForm';
import OrderForm from '../containers/project/order/OrderForm';
import SelectionForm from '../containers/product/selection/SelectionForm';
import FinishForm from '../containers/product/selection/Finish/FinishForm';
import SimpleForm from '../containers/project/order/selection/SimpleForm';
import Product from '../containers/product/Product';
import ProductForm from '../containers/product/ProductTest';

const App = () => {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/projects" component={Landing} />
                        <Route exact path="/samples/list" component={SampleCompleteList} />
                        <Route exact path="/projects/new" component={ClientForm} />
                        <Route path="/projects/:projectId/rooms/:roomId/orders/:orderId" component={OrderForm} />
                        <Route exact path="/projects/:clientId/contact" component={ClientForm} />
                        <Route exact path='/simple' component={SimpleForm} />
                        <Route exact path="/projects/:clientId" component={ProjectForm} />
                        <Route exact path="/products/selections/finishes" component={FinishForm} />
                        <Route exact path="/products/selections" component={SelectionForm} />
                        <Route exact path="/products" component={Product} />
                        <Route exact path="/products/new" component={ProductForm} />
                        <Route exact path="/products/:productId" component={ProductForm} />
                        
                        
                    </div>
                </BrowserRouter>
            </div>
        );
};

export default App;