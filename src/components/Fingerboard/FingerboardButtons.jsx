import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
  trainStart,
  trainEnd,
  userSelectedNote,
  toggleShowAllNotes
} from "../../store/actions/guitar";
import StandartButton from '../../ui/buttons/StandartButton';

import "./style/FingerboardButtons.css";

class FingerboardButtons extends PureComponent {
  buttonHolder = React.createRef();
  notes = ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"];
  keycodeNotes = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187];
  keyboardNotes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='];

  componentWillMount() {
    document.addEventListener("keydown", this.hendleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.hendleKeyDown, false);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line
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
        if (!nextProps.showAllNotes) {
          this.answerToUserClear();
        }
    }
  }

  hendleKeyDown = ({ keyCode }) => {
    const { stage, userSelectedNote, withoutSharps } = this.props;
    if (stage === "showQuestion" && this.keycodeNotes.includes(keyCode)) {

      const note = this.notes[this.keycodeNotes.indexOf(keyCode)];
      //check if withoutSharps is true and selected note has # -> return false
      if(withoutSharps && note.includes('#')) return false;

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
    const { trainingStart, withoutSharps } = this.props;

    return (
      <div className="FingerboardButtons" ref={this.buttonHolder}>

        <StandartButton
          onClick={this.buttonStartPressed}
          text={!trainingStart ? "START" : "END"}
          keycupsName="space"
        />

        <ReactCSSTransitionGroup
          className="notes-list"
          component="ul"
          transitionName="fade"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}>
          {
            this.props.trainingStart && this.notes.map((note, i) => {
              const disabled = (withoutSharps && note.includes('#')) ? true : false;
              return (
                <li
                  key={i}
                  data-disabled={disabled}
                  data-note={note}
                  onClick={() => this.pressOnNote(note)}
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
    userAnswer: state.guitar.userAnswer,
    withoutSharps: state.guitar.withoutSharps
  };
};

export default connect(mapStateToProps, {
  trainStart,
  trainEnd,
  userSelectedNote,
  toggleShowAllNotes
})(FingerboardButtons);
