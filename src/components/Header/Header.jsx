import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid  from 'shortid';

import {toggleShowAllNotes} from '../../store/actions/guitar';
import './style/Header.css';

class Header extends Component {

    state = {
        userID:null
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
            <div className="Header">
                <div className="logo">
                    test HEADER
                </div>


                <div className="controls">
                    <div className="btn btn-wide" onClick={this.props.toggleShowAllNotes}>
                        <svg>
                            <rect x="0" y="0" fill="none" width="100%" height="100%" />
                        </svg>
                        <span>
                            <span>Показать все ноты</span>
                        </span>
                        <i className="keyboardKey">backspace</i>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null,{toggleShowAllNotes})(Header);