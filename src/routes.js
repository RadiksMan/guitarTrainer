import React from 'react';

import { Route, BrowserRouter as Router,Switch} from 'react-router-dom';

import App from './components/App';
import NoMatch from './containers/error-404';
import Header from './components/Header/Header';

const Routes = () => (
    <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
            <Header/>
            <Switch>
                    <Route exact path='/' component={App}/>

                    <Route component={NoMatch}/>
            </Switch>
        </div>
    </Router>
);



export default Routes;