import React from 'react';

import { Route, BrowserRouter as Router,Switch} from 'react-router-dom';

import App from './components/App';
import NoMatch from './containers/error-404';
import Header from './components/header';

const Routes = () => (
    <Router>
        <div>
            <Header/>
            <Switch>
                    <Route exact path="/" component={App}/>

                    <Route component={NoMatch}/>
            </Switch>
        </div>
    </Router>
);



export default Routes;