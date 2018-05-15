import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import "./style/FingerboardButtons.css";
import {
  trainStart,
  trainEnd,
  userSelectedNote,
  toggleShowAllNotes
} from "../../store/actions/guitar";

class FingerboardButtons extends PureComponent {
  buttonHolder = React.createRef();
  notes = ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"];
  keycodeNotes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187];
  keyboardNotes = ['1','2','3','4','5','6','7','8','9','0','-','='];

  componentWillMount() {
    document.addEventListener("keydown", this.hendleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.hendleKeyDown, false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    switch (nextProps.stage) {
      case "showQuestion":
        if (this.props.stage === "showAnswer") {
          //show-answer-end stage
          this.answerToUserClear();
        }
        break;
      case "showAnswer":
        if (nextProps.userAnswer) {
          this.showAnswerToUser(nextProps.userAnswer);
        }
        break;
      case null:
        if(!nextProps.showAllNotes){
          this.answerToUserClear();
        }
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
    if (keyCode === 8) {
      //pressed backspace - taggle show all notes
      this.props.toggleShowAllNotes();
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

  showAnswerToUser = userAnswer => {
    const {
      userAnswerCorrect,
      userAnswerNote,
      correctUnswerNote: { noteName }
    } = userAnswer;

    const selectedNoteDom = this.buttonHolder.current.querySelector(
      `.notes-list li[data-note="${userAnswerNote.toLowerCase()}"]`
    );

    if (userAnswerCorrect) {
      selectedNoteDom.classList.add("answer-correct");
    } else {
      selectedNoteDom.classList.add("answer-wrong");

      const correctNoteDom = this.buttonHolder.current.querySelector(
        `li[data-note="${noteName.toLowerCase()}"]`
      );
      correctNoteDom.classList.add("answer-correct");
    }
  };

  answerToUserClear = () => {
    const buttonsAll = this.buttonHolder.current.querySelectorAll(".notes-list li");
    buttonsAll.forEach(item =>
      item.classList.remove("answer-correct", "answer-wrong")
    );
  };

  render() {
    const { trainingStart } = this.props;
    const transitionTiming = 300;
    let leftItems = 0,rightItems = 0;

    return (
      <div className="FingerboardButtons" ref={this.buttonHolder}>

        <div className="btn" onClick={this.buttonStartPressed}>
          <svg>
            <rect x="0" y="0" fill="none" width="100%" height="100%" />
          </svg>
          <span>
            {!trainingStart ? "START" : "END"}
          </span>
          <i className="keyboardKey">space</i>
        </div>

        <ReactCSSTransitionGroup
          className="notes-list"
          component="ul"
          transitionName="fade"
          transitionEnterTimeout={transitionTiming}
          transitionLeaveTimeout={transitionTiming}>
          {
            this.props.trainingStart && this.notes.map((note, i, noteArray) => {
              const noteMiddleLength = noteArray.length / 2;
              const transIteration = transitionTiming/noteMiddleLength;
              console.log('transIteration', transIteration)
              let transitionDelay = 0;
              if (noteMiddleLength > i){
                console.log('left',i)
              }else {
                console.log('right', i)

              }

              return (
                <li
                  key={i}
                  data-note={note}
                  onClick={() => this.pressOnNote(note)}
                  style={{ transitionDelay: transitionDelay+'s'}}
                >
                  <span>{note.toUpperCase()}</span>
                  <i className="keyboardKey">{this.keyboardNotes[i]}</i>
                </li>
              )
            })
          }
        </ReactCSSTransitionGroup>

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
  userSelectedNote,
  toggleShowAllNotes
})(FingerboardButtons);
