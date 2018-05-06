import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid  from 'shortid';

import { toggleShowAllNotes, changeGuitarType} from '../../store/actions/guitar';
import { userInitLoad} from '../../store/actions/user';
import './style/Header.css';

class Header extends Component {


    componentWillMount(){
        this.props.userInitLoad();
    }

    handleGuitarTypeChange = event => {
        const selectedGuitarType = event.target.value;
        this.props.changeGuitarType(selectedGuitarType)
    }

    render() {
        const guitarTypeName = ['Standart','Bass','Ukulele'];

        return(
            <div className="Header">
                <div className="logo">
                    HEADER LOGO
                </div>

                <div className="controls">
                    <div className="select select-guitarType">
                        <select onChange={this.handleGuitarTypeChange}>
                            {
                                this.props.guitarTypeList.map((item,i)=>(
                                    <option value={item} key={i}>{guitarTypeName[i] || '...'}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="btn btn-wide" onClick={this.props.toggleShowAllNotes}>
                        <svg>
                            <rect x="0" y="0" fill="none" width="100%" height="100%" />
                        </svg>
                        <span>
                            <span>Show all notes</span>
                        </span>
                        <i className="keyboardKey">backspace</i>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        guitarTypeList: state.guitar.guitarTypeList,
    }
}

export default connect(mapStateToProps, { toggleShowAllNotes, userInitLoad, changeGuitarType})(Header);