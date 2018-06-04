import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {
    toggleShowAllNotes,
    changeGuitarType,
    changeGuitarSharpVisibility
} from '../../store/actions/guitar';
import {
    userInitLoad,
    changeUserAnswerTiming
} from '../../store/actions/user';

import StandartButton from '../../ui/buttons/StandartButton';
import HeaderLogo from './HeaderLogo';
import './style/Header.css';

class Header extends PureComponent {

    componentWillMount(){
        this.props.userInitLoad();
    }

    handleGuitarTypeChange = selectedOption => {
        const selectedGuitarType = selectedOption.value;
        if (selectedGuitarType){
            this.props.changeGuitarType(selectedGuitarType)
        }
    }

    handleGuitarAnserTimingChange = selectedOption => {
        const selectedTimingAnwer = selectedOption.value;
        if (selectedTimingAnwer){
            this.props.changeUserAnswerTiming(selectedTimingAnwer)
        }
    }

    render() {
        const guitarTypeName = ['Standart','Bass','Ukulele'];
        const {
            guitarTypeList,
            guitarType,
            userUnswerTiming:{
                currentTiming,
                timingList
            }
        } = this.props;

        const selectGuitarTypeOpt = guitarTypeList.map((item, i) => {
            return { value: item, label: guitarTypeName[i] || '',}
        })
        const selectGuitarTimingOpt = timingList.map((item, i) => {
            return { value: item, label: `Answer time - ${item/1000}s`}
        })

        return(
            <div className="Header">
                <div className="logo">
                    <HeaderLogo/>
                </div>

                <div className="controls">

                    <div>
                        <input
                            type="checkbox"
                            onChange={e =>{
                                this.props.changeGuitarSharpVisibility(e.target.checked)
                            }}
                        />
                    </div>

                    <div className="select select-guitar">
                        <Select
                            value={guitarType}
                            onChange={this.handleGuitarTypeChange}
                            options={selectGuitarTypeOpt}
                            clearable={false}
                            searchable={false}
                            multi={false}
                        />
                    </div>

                     <div className="select select-guitar">
                        <Select
                            value={currentTiming}
                            onChange={this.handleGuitarAnserTimingChange}
                            options={selectGuitarTimingOpt}
                            clearable={false}
                            searchable={false}
                            multi={false}
                        />
                    </div>

                    <StandartButton
                        onClick={this.props.toggleShowAllNotes}
                        text="Show all notes"
                        keycupsName="backspace"
                        wide
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        guitarTypeList: state.guitar.guitarTypeList,
        guitarType: state.guitar.guitarType,
        userUnswerTiming:state.user.userUnswerTiming
    }
}

export default connect(
    mapStateToProps,
    {
        toggleShowAllNotes,
        userInitLoad,
        changeGuitarType,
        changeUserAnswerTiming,
        changeGuitarSharpVisibility
    }
)(Header);