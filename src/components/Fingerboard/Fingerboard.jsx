import React, { Component } from 'react';
import {connect} from 'react-redux';

import {getOffset} from '../../services/utility';
import guitarConfig from '../../json/guitar.json';
import './style/Fingerboard.css';

class Fingerboard extends Component {

    arrowRef = React.createRef();
    guitarNackRef = React.createRef();
    questionNoteDom = null;

    state = {
        guitarType: this.props.guitarType,
        guitarTypeModule: null
    }

    componentWillMount(){
        this.updateGuitarType(this.state.guitarType)
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     if (nextState.guitarType === this.state.guitarType) return false;
    //     return true;
    // }

    UNSAFE_componentWillReceiveProps(nextProps){

        switch(nextProps.stage){
            case 'showQuestion':
                if(this.props.stage === 'showAnswer'){
                    //show-answer-end stage
                    this.questionNoteClear();
                }
                if (nextProps.questionNote !== this.props.questionNote){
                    this.askQuestionNote(nextProps.questionNote)
                }
                if(this.props.showAllNotes){
                    this.toggleShowAllNotes(true);
                }
                break;
            case 'showAnswer':
                if(nextProps.userAnswer){
                    this.showAnswerToUserSTART(nextProps.userAnswer)
                }
                break;
            case null:
                if(nextProps.trainingStart === false && this.props.trainingStart === true){
                    this.trainEnd();
                }
                if(nextProps.showAllNotes !== this.props.showAllNotes){
                    this.toggleShowAllNotes();
                }
                if (nextProps.guitarType !== this.props.guitarType) {
                    this.updateGuitarType(nextProps.guitarType );
                }
                break
        }
    }

    askQuestionNote = questionNote => {
        const {fretNumber,noteNumber} = questionNote;
        const guitarNeck = this.guitarNackRef.current;

        this.questionNoteDom = guitarNeck.querySelector(`.fret.f${fretNumber} .note.n${noteNumber}`)

        if(this.questionNoteDom){
            //show note
            this.questionNoteDom.classList.add('question');
            this.moveArrowToQuestionNote(this.questionNoteDom)

        }else {
            throw new Error('Error in askQuestionNote() - miss the question Note!');
        }
    }

    questionNoteClear = () => {
        if(this.questionNoteDom){
            this.questionNoteDom.classList.remove('question','answer-correct','answer-wrong')
        }
    }

    trainEnd = () => {
        //train end - clear guitar neck
        const allNotes = this.guitarNackRef.current.querySelectorAll(`.note`);
        const arrow = this.arrowRef.current;

        allNotes.forEach(item=>item.classList.remove('question','answer-correct','answer-wrong'));
        arrow.classList.remove('active');
        arrow.removeAttribute('style');
    }

    toggleShowAllNotes = (hide = false) => {
        // TODO - ref to parent !!!!!!
        const guitarNeck = this.guitarNackRef.current;
        guitarNeck.firstChild.classList.toggle('show-all-notes')
    }

    moveArrowToQuestionNote = questionNoteDom => {
        const arrow = this.arrowRef.current;
        const guitarNeck = this.guitarNackRef.current;

        arrow.classList.add('active');

        const guitarNeckPos = getOffset(guitarNeck);
        const questionNoteDomPos = getOffset(questionNoteDom);
        const questionNotePos = {
            left:questionNoteDomPos.left - guitarNeckPos.left,
            top:questionNoteDomPos.top - guitarNeckPos.top,
        }

        arrow.style.left = questionNotePos.left + questionNoteDom.offsetWidth/2 +'px';
        arrow.style.top = questionNotePos.top+'px';
    }

    showAnswerToUserSTART = userAnswer => {
        const { userAnswerCorrect, userAnswerNote, correctUnswerNote:{noteName,fretNumber,noteNumber} } = userAnswer;

        const questionNoteDom = this.guitarNackRef.current.querySelector(`.fret.f${fretNumber} .note.n${noteNumber}`)

        questionNoteDom.classList.add(userAnswerCorrect ? 'answer-correct' : 'answer-wrong')
    }

    updateGuitarType = guitarType => {

        import(`./guitarTypes/${guitarType}`).then(module => {
            this.setState({
                guitarTypeModule: module.default,
                guitarType
            })
        })
    }

    render() {
        // eslint-disable-next-line
        const { trainingStart, questionNote, guitarType} = this.props;
        const { guitarTypeModule: GuitarMarkupComponent } = this.state;

        return (
            <div className="Fingerboard">
                <div className="fingerboard-wrapper">
                    <div
                        className="arrow"
                        ref={this.arrowRef}
                    >
                        <div className="arrowBody"></div>
                    </div>

                    <div
                        ref={this.guitarNackRef}
                    >
                        {GuitarMarkupComponent &&
                            <GuitarMarkupComponent
                            {...guitarConfig[guitarType]}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        trainingStart:state.guitar.trainingStart,
        questionNote:state.guitar.questionNote,
        userAnswer:state.guitar.userAnswer,
        stage:state.guitar.stage,
        showAllNotes:state.guitar.showAllNotes,
        guitarType: state.guitar.guitarType,
    }
}

export default connect(
    mapStateToProps,
    null
)(Fingerboard);