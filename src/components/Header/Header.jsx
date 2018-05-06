import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid  from 'shortid';

import {toggleShowAllNotes} from '../../store/actions/guitar';
import { userInitLoad} from '../../store/actions/user';
import './style/Header.css';

class Header extends Component {

    componentWillMount(){
        this.props.userInitLoad();
    }

    render() {
        return(
            <div className="Header">
                <div className="logo">
                    HEADER LOGO
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



export default connect(null, { toggleShowAllNotes, userInitLoad})(Header);