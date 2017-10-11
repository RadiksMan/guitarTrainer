import React, { Component } from 'react';
import { connect } from 'react-redux';

import shortid  from 'shortid';

class Header extends Component {

    constructor(){
        super();
        this.state = {
            userID:null
        }
    }

    componentDidMount() {
        this.declareUserID('user-id')
    }

    declareUserID(name){
        let id;

        if( localStorage.getItem(name) ){
            id = localStorage.getItem(name);
        } else {
            id = shortid.generate();
            localStorage.setItem(name,id);
        }
        console.log('id', id)
        this.setState({userID:id});

    }

    render() {
        return(
            <div>
                test HEADER
            </div>    
        )
    }
}

export default connect(null,null)(Header);