import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

import './style/FingerboardButtons.css';
import {trainStart,trainEnd} from '../../store/actions/guitar';

class FingerboardButtons extends PureComponent {

    notes = ['a','a#','b','c','c#','d','d#','e','f','f#','g','g#']
    keycodeNotes = [49,50,51,52,53,54,55,56,57,48,189,187]

    componentWillMount(){
        document.addEventListener("keydown", this.hendleKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.hendleKeyDown, false);
    }

    hendleKeyDown = ({keyCode}) => {
        const {stage} = this.props;
        if(stage === 'selectNote' && this.keycodeNotes.includes(keyCode)){
            const note = this.notes[this.keycodeNotes.indexOf(keyCode)]
            console.log("note ", note);
        }

    }

    pressOnNote = note => {
        const {stage} = this.props;
        if(stage === 'selectNote'){
            console.log(note);
        }
    }

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
                    {
                        this.notes.map((note,i)=>(
                            <li
                                key={i}
                                data-note={note}
                                onClick={()=>this.pressOnNote(note)}
                            >
                                {note.toUpperCase()}
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        trainingStart:state.guitar.trainingStart,
        questionNote:state.guitar.questionNote,
        stage:state.guitar.stage,
    }
}

export default connect(
    mapStateToProps,
    {
        trainStart,
        trainEnd
    }
)(FingerboardButtons);
