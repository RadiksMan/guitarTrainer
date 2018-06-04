import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
    trainEnd as trainEndAction,
} from "../../store/actions/guitar";
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

    componentDidMount(){
        window.addEventListener('resize',() => this.moveArrowToQuestionNote(this.questionNoteDom, true))
    }

    componentWillUnmount(){
        window.removeEventListener('resize', () => this.moveArrowToQuestionNote(this.questionNoteDom,true))
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        // eslint-disable-next-line
        switch(nextProps.stage){
            case 'showQuestion':
                if(this.props.stage === 'showAnswer'){
                    //show-answer-end stage
                    this.questionNoteClear();
                }
                if (nextProps.questionNote !== this.props.questionNote){
                    this.questionNoteClear();
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
                    this.updateGuitarType(nextProps.guitarType);
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

    moveArrowToQuestionNote = (questionNoteDom,resize) => {
        if (!questionNoteDom || (resize && this.props.stage == null)) return false;

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
        const { userAnswerCorrect, correctUnswerNote:{fretNumber,noteNumber} } = userAnswer;

        let questionNoteDom = this.guitarNackRef.current.querySelector(`.fret.f${fretNumber} .note.n${noteNumber}`)

        this.questionNoteClear();

        if (questionNoteDom){
            questionNoteDom.classList.add(userAnswerCorrect ? 'answer-correct' : 'answer-wrong')
        }else {

            this.props.trainEndAction();
            this.trainEnd();
            alert('Error, you train too fast !!!')
        }
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
        const { guitarType } = this.props;
        const { guitarTypeModule: GuitarMarkupComponent } = this.state;

        return (
            <div className="Fingerboard">
                <div className="fingerboard-wrapper">

                    <FingerboardArrow
                        arrowRef={this.arrowRef}
                    />

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

const FingerboardArrow = props => {

    return(
        <div
            className="arrow"
            ref={props.arrowRef}
        >
            <div className="arrowBody">
                <svg width="23.999999999999996" height="35" xmlns="http://www.w3.org/2000/svg" >
                    <g>
                        <path fill="#fff" d="m23.13629,18.42812l-6.08583,0l0,-18.29797c0,-0.40423 -0.24866,-0.73195 -0.55544,-0.73195l-8.88769,0c-0.30678,0 -0.5555,0.32771 -0.5555,0.73195l0,18.29804l-6.11025,0c-0.30678,0.00007 -0.55544,0.32786 -0.55534,0.73208c0.00005,0.19364 0.05833,0.37946 0.16206,0.51656l11.08181,14.65012c0.1042,0.13772 0.2457,0.21512 0.39328,0.21518l0,0c0.14743,0.00034 0.28892,-0.07651 0.39328,-0.21374l11.10957,-14.65012c0.21721,-0.28545 0.21763,-0.74889 0.00099,-1.0351c-0.10363,-0.13689 -0.24419,-0.21422 -0.39093,-0.21505l0,0z" />
                    </g>
                </svg>
            </div>

        </div>
    )
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
    { trainEndAction}
)(Fingerboard);