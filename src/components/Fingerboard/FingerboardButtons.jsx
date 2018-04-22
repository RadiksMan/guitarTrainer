import React, { PureComponent } from "react";
import { connect } from "react-redux";

import "./style/FingerboardButtons.css";
import {
  trainStart,
  trainEnd,
  userSelectedNote
} from "../../store/actions/guitar";

class FingerboardButtons extends PureComponent {

  buttonHolder = React.createRef();
  notes = ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"];
  keycodeNotes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187];

  componentWillMount() {
    document.addEventListener("keydown", this.hendleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.hendleKeyDown, false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.userAnswer) {
      this.showAnswerToUserSTART(nextProps.userAnswer);
    }
  }

  hendleKeyDown = ({ keyCode }) => {
    const { stage, userSelectedNote } = this.props;
    if (stage === "showQuestion" && this.keycodeNotes.includes(keyCode)) {
      const note = this.notes[this.keycodeNotes.indexOf(keyCode)];
      userSelectedNote(note.toUpperCase());
    }
    if (keyCode === 32) {
      //pressed space - toggle training
      this.buttonStartPressed();
    }
  };

  pressOnNote = note => {
    const { stage, userSelectedNote } = this.props;
    if (stage === "showQuestion") {
      userSelectedNote(note.toUpperCase());
    }
  };

  buttonStartPressed = () => {
    const { trainingStart, trainStart, trainEnd } = this.props;
    !trainingStart ? trainStart() : trainEnd();
  };

  showAnswerToUserSTART = userAnswer => {
    const { userAnswerCorrect, userAnswerNote, correctUnswerNote:{noteName} } = userAnswer;

    const selectedNoteDom = this.buttonHolder.current.querySelector(`li[data-note="${userAnswerNote.toLowerCase()}"]`)
    
    if(userAnswerCorrect){
        selectedNoteDom.classList.add('answer-correct');
    }else {
        selectedNoteDom.classList.add('answer-wrong');
        
        const correctNoteDom = this.buttonHolder.current.querySelector(`li[data-note="${noteName.toLowerCase()}"]`);
        correctNoteDom.classList.add('answer-correct');
    }
  };

  render() {
    // eslint-disable-next-line
    const { trainingStart, questionNote } = this.props;

    return (
      <div className="FingerboardButtons">
        <div className="start-button" onClick={this.buttonStartPressed}>
          {!trainingStart ? "START" : "END"}
        </div>
        <ul className="notes-list" ref={this.buttonHolder}>
          {this.notes.map((note, i) => (
            <li key={i} data-note={note} onClick={() => this.pressOnNote(note)}>
              <span>{note.toUpperCase()}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trainingStart: state.guitar.trainingStart,
    questionNote: state.guitar.questionNote,
    stage: state.guitar.stage,
    userAnswer: state.guitar.userAnswer
  };
};

export default connect(mapStateToProps, {
  trainStart,
  trainEnd,
  userSelectedNote
})(FingerboardButtons);
