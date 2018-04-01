import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import './style/FingerboardButtons.css';
import {trainStart,trainEnd} from '../../store/actions/guitar';

class FingerboardButtons extends PureComponent {
    render() {
        const {trainingStart,questionNote} = this.props;
        return (
            <div className="FingerboardButtons">
                <div 
                    className="start-button"
                    onClick={()=> !trainingStart ? this.props.trainStart() : this.props.trainEnd()}
                >
                    {!trainingStart ? 'START': 'END'}
                </div>
                <ul className="notes-list">
                    <li data-note="a">A</li>
                    <li data-note="a#">A#</li>
                    <li data-note="b">B</li>
                    <li data-note="c">C</li>
                    <li data-note="c#">C#</li>
                    <li data-note="d">D</li>
                    <li data-note="d#">D#</li>
                    <li data-note="e">E</li>
                    <li data-note="f">F</li>
                    <li data-note="f#">F#</li>
                    <li data-note="g">G</li>
                    <li data-note="g#">G#</li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        trainingStart:state.guitar.trainingStart,
        questionNote:state.guitar.questionNote,
    }
}

export default connect(
    mapStateToProps,
    {
        trainStart,
        trainEnd
    }
)(FingerboardButtons);
