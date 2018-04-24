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
        //console.log('User initialise id ->', id)
        this.setState({userID:id});

    }

    render() {
        return(
            <div>
                test HEADER


                <button>
                    <span>Показать все ноты на грифе</span>
                </button>
            </div>    
        )
    }
}

export default connect(null,null)(Header);