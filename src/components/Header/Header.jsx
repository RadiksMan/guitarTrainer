import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { toggleShowAllNotes, changeGuitarType} from '../../store/actions/guitar';
import { userInitLoad} from '../../store/actions/user';

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

    render() {
        const guitarTypeName = ['Standart','Bass','Ukulele'];
        const selectOptions = this.props.guitarTypeList.map((item, i) => {

            return { value: item, label: guitarTypeName[i],}
        })
        return(
            <div className="Header">
                <div className="logo">
                    <HeaderLogo/>
                </div>

                <div className="controls">
                    <div className="select select-guitarType">

                        <Select
                            value={this.props.guitarType}
                            onChange={this.handleGuitarTypeChange}
                            options={selectOptions}
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
    }
}

export default connect(
    mapStateToProps,
    {
        toggleShowAllNotes,
        userInitLoad,
        changeGuitarType
    }
)(Header);