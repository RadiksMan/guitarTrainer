import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { toggleShowAllNotes, changeGuitarType} from '../../store/actions/guitar';
import { userInitLoad} from '../../store/actions/user';
import './style/Header.css';

class Header extends Component {

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
                    <svg viewBox="0 0 210 209" preserveAspectRatio="xMidYMid meet"  width="20%" height="30%">
                        <g id="SvgjsG1032" featurekey="root" fill="#fff" transform="matrix(1,0,0,1,0,0)"></g>
                        <g id="SvgjsG1033" featurekey="symbol1" fill="#fff" transform="matrix(1.7857142857142858,0,0,1.7857142857142858,51.42857142857143,1.4338030133928568)">
                            <title>Music - 005 - Guitar</title>
                            <path d="M37.18872,34.99707H35.061a13.927,13.927,0,0,1-.9552,2h2.25946A15.86443,15.86443,0,0,0,37.18872,34.99707Z"></path>
                            <path d="M37.94934,30.99707h-2a13.95325,13.95325,0,0,1-.28119,2h2.04A15.99451,15.99451,0,0,0,37.94934,30.99707Z"></path>
                            <path d="M33.94934,30.99707H10.05066a11.90218,11.90218,0,0,0,.3443,2H33.605A11.90218,11.90218,0,0,0,33.94934,30.99707Z"></path>
                            <path d="M29.91064,38.99707H14.08936a11.92972,11.92972,0,0,0,15.82129,0Z"></path>
                            <path d="M6.05066,28.99707h2a13.95325,13.95325,0,0,1,.28119-2h-2.04A15.99451,15.99451,0,0,0,6.05066,28.99707Z"></path>
                            <path d="M6.81128,24.99707H8.939a13.927,13.927,0,0,1,.9552-2H7.63477A15.86443,15.86443,0,0,0,6.81128,24.99707Z"></path>
                            <path d="M37.70813,26.99707h-2.04a13.95325,13.95325,0,0,1,.28119,2h2A15.99451,15.99451,0,0,0,37.70813,26.99707Z"></path>
                            <path d="M22,13.99707a15.99312,15.99312,0,0,0-13.21838,7h2.50995a13.96706,13.96706,0,0,1,21.41687,0h2.50995A15.99312,15.99312,0,0,0,22,13.99707Z"></path>
                            <path d="M37.18872,24.99707a15.86443,15.86443,0,0,0-.82349-2H34.10577a13.927,13.927,0,0,1,.9552,2Z"></path>
                            <path d="M32.89453,34.99707H11.10547a11.99126,11.99126,0,0,0,1.16779,2H31.72675A11.99126,11.99126,0,0,0,32.89453,34.99707Z"></path>
                            <path d="M4.72125,34.99707H2v2H5.41687A17.878,17.878,0,0,1,4.72125,34.99707Z"></path>
                            <path d="M4.05066,30.99707H2v2H4.27094A17.9751,17.9751,0,0,1,4.05066,30.99707Z"></path>
                            <path d="M7,57.99707H53a5.00589,5.00589,0,0,0,5-5v-14H56v3a1,1,0,0,1-2,0v-3H50v3a1,1,0,0,1-2,0v-3H44v3a1,1,0,0,1-2,0v-3H37.56451a17.95856,17.95856,0,0,1-31.129,0H2v14A5.00589,5.00589,0,0,0,7,57.99707Zm46-4h1a1,1,0,0,1,0,2H53a1,1,0,0,1,0-2Zm-11,0h7a1,1,0,0,1,0,2H42a1,1,0,0,1,0-2Z"></path>
                            <path d="M4.27094,26.99707H2v2H4.05066A17.9751,17.9751,0,0,1,4.27094,26.99707Z"></path>
                            <path d="M5.41687,22.99707H2v2H4.72125A17.878,17.878,0,0,1,5.41687,22.99707Z"></path>
                            <path d="M33.605,26.99707H10.395a11.90218,11.90218,0,0,0-.3443,2H33.94934A11.90218,11.90218,0,0,0,33.605,26.99707Z"></path>
                            <path d="M11.10547,24.99707H32.89453a11.99126,11.99126,0,0,0-1.16779-2H12.27325A11.99126,11.99126,0,0,0,11.10547,24.99707Z"></path>
                            <path d="M14.08936,20.99707H29.91064a11.92972,11.92972,0,0,0-15.82129,0Z"></path>
                            <path d="M22,45.99707a15.99312,15.99312,0,0,0,13.21838-7H32.70844a13.96706,13.96706,0,0,1-21.41687,0H8.78162A15.99312,15.99312,0,0,0,22,45.99707Z"></path>
                            <path d="M9.89423,36.99707a13.927,13.927,0,0,1-.9552-2H6.81128a15.86474,15.86474,0,0,0,.82355,2Z"></path>
                            <path d="M42,30.99707H39.94934a17.9751,17.9751,0,0,1-.22028,2H42Z"></path>
                            <rect x="56" y="30.99707" width="2" height="2"></rect>
                            <rect x="50" y="22.99707" width="4" height="2"></rect>
                            <rect x="56" y="34.99707" width="2" height="2"></rect>
                            <rect x="50" y="30.99707" width="4" height="2"></rect>
                            <rect x="50" y="34.99707" width="4" height="2"></rect>
                            <rect x="56" y="26.99707" width="2" height="2"></rect>
                            <path d="M22,11.99707a17.99578,17.99578,0,0,1,15.56451,9H42v-3a1,1,0,1,1,2,0v3h4v-3a1,1,0,1,1,2,0v3h4v-3a1,1,0,1,1,2,0v3h2v-14a5.00589,5.00589,0,0,0-5-5H7a5.00589,5.00589,0,0,0-5,5v14H6.43549A17.99578,17.99578,0,0,1,22,11.99707Zm-11-8h7a1,1,0,0,1,0,2H11a1,1,0,0,1,0-2Zm-6,1a1,1,0,0,1,1-1H7a1,1,0,0,1,0,2H6A1,1,0,0,1,5,4.99707Z"></path>
                            <rect x="56" y="22.99707" width="2" height="2"></rect>
                            <path d="M38.58313,36.99707H42v-2H39.27875A17.878,17.878,0,0,1,38.58313,36.99707Z"></path>
                            <path d="M42,26.99707H39.72906a17.9751,17.9751,0,0,1,.22028,2H42Z"></path>
                            <path d="M6.29187,32.99707h2.04a13.95325,13.95325,0,0,1-.28119-2h-2A15.99451,15.99451,0,0,0,6.29187,32.99707Z"></path>
                            <rect x="50" y="26.99707" width="4" height="2"></rect>
                            <path d="M42,22.99707H38.58313a17.878,17.878,0,0,1,.69562,2H42Z"></path>
                            <rect x="44" y="30.99707" width="4" height="2"></rect>
                            <rect x="44" y="34.99707" width="4" height="2"></rect>
                            <rect x="44" y="26.99707" width="4" height="2"></rect>
                            <rect x="44" y="22.99707" width="4" height="2"></rect>
                        </g>
                        <g id="SvgjsG1034" featurekey="text1" fill="#fff" transform="matrix(2.9253296250526546,0,0,2.9253296250526546,2.367204453377303,86.33176911652164)">
                            <path d="M14.46 16.96 c0.3 4.48 -2.76 7.24 -6.4 7.24 c-3.74 0 -7.16 -2.96 -7.16 -7.2 s3.5 -7.2 7.16 -7.2 c1.76 0 3.36 0.6 4.62 1.66 l-1.02 1.16 c-0.98 -0.78 -2.24 -1.24 -3.5 -1.24 c-2.86 0 -5.54 2.32 -5.54 5.62 s2.6 5.62 5.44 5.62 c2.48 0 4.46 -1.34 4.84 -4.22 l-4.08 0 l0 -1.44 l5.64 0 z M25.08 10 l1.66 0 l0 8.92 c0 3.44 -2.24 5.38 -5.08 5.38 s-5.08 -1.94 -5.08 -5.38 l0 -8.92 l1.66 0 l0 8.92 c0 2.62 1.56 3.8 3.42 3.8 s3.42 -1.18 3.42 -3.8 l0 -8.92 z M30.8 10 l0 14 l-1.66 0 l0 -14 l1.66 0 z M42.24 10 l0 1.56 l-3.88 0 l0 12.44 l-1.66 0 l0 -12.44 l-3.9 0 l0 -1.56 l9.44 0 z M55.56 24 l-1.44 -3.3 l-7.48 0 l-1.44 3.3 l-1.76 0 l6.24 -14 l1.38 0 l6.26 14 l-1.76 0 z M47.26 19.3 l6.24 0 l-3.12 -7.12 z M69.2 24 l-1.8 0 l-3.54 -5.04 l-0.38 0 l-2.9 0 l0 5.04 l-1.66 0 l0 -14 l4.56 0 c3.14 0 4.96 1.92 4.96 4.52 c0 2 -1.08 3.56 -3 4.16 z M60.58 11.56 l0 5.92 l2.86 0 c2.02 0 3.34 -1.04 3.34 -2.96 c0 -1.94 -1.32 -2.96 -3.34 -2.96 l-2.86 0 z"></path>
                        </g>
                        <g id="SvgjsG1035" featurekey="text2" fill="#fff" transform="matrix(2.6022402080823492,0,0,2.6022402080823492,2.9182085780410163,140.9775979191765)">
                            <path d="M10.24 10 l0 1.56 l-3.88 0 l0 12.44 l-1.66 0 l0 -12.44 l-3.9 0 l0 -1.56 l9.44 0 z M22.520000000000003 24 l-1.8 0 l-3.54 -5.04 l-0.38 0 l-2.9 0 l0 5.04 l-1.66 0 l0 -14 l4.56 0 c3.14 0 4.96 1.92 4.96 4.52 c0 2 -1.08 3.56 -3 4.16 z M13.9 11.56 l0 5.92 l2.86 0 c2.02 0 3.34 -1.04 3.34 -2.96 c0 -1.94 -1.32 -2.96 -3.34 -2.96 l-2.86 0 z M35.64 24 l-1.44 -3.3 l-7.48 0 l-1.44 3.3 l-1.76 0 l6.24 -14 l1.38 0 l6.26 14 l-1.76 0 z M27.34 19.3 l6.24 0 l-3.12 -7.12 z M40.66 10 l0 14 l-1.66 0 l0 -14 l1.66 0 z M52.82 10 l1.66 0 l0 14 l-1.28 0 l-8.48 -10.96 l0 10.96 l-1.66 0 l0 -14 l1.28 0 l8.48 10.98 l0 -10.98 z M58.54 22.44 l6.66 0 l0 1.56 l-7.06 0 l-1.26 0 l0 -14 l1.66 0 l6.48 0 l0 1.56 l-6.48 0 l0 4.64 l5.04 0 l0 1.52 l-5.04 0 l0 4.72 z M77.58 24 l-1.8 0 l-3.54 -5.04 l-0.38 0 l-2.9 0 l0 5.04 l-1.66 0 l0 -14 l4.56 0 c3.14 0 4.96 1.92 4.96 4.52 c0 2 -1.08 3.56 -3 4.16 z M68.96 11.56 l0 5.92 l2.86 0 c2.02 0 3.34 -1.04 3.34 -2.96 c0 -1.94 -1.32 -2.96 -3.34 -2.96 l-2.86 0 z"></path>
                        </g>
                    </svg>
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
        guitarType: state.guitar.guitarType,
    }
}

export default connect(mapStateToProps, { toggleShowAllNotes, userInitLoad, changeGuitarType})(Header);