import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Landing from './client/clientDashboard';
import ClientNew from './client/clientNew';
import SampleCompleteList from '../containers/sample/SampleCompleteList';

const App = () => {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/projects" component={Landing} />
                        <Route exact path="/samples/list" component={SampleCompleteList} />
                        <Route path="/projects/new" component={ClientNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
};

export default App;