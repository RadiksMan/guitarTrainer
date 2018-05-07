import * as actionTypes from "../actions/actionTypes";
import * as guitars from "../../json/guitar.json";

import {
  generateNoteQuestion,
  verifyCorrectUserAnswer
} from "../../services/guitarQuest";

const guitarStage = [
  null, //0 - init state
  "showQuestion", //1 - user start the train and sees question icon on guitar neck
  "showAnswer", //2 - user select answer note and see correct/uncorrect "answer"
];

const guitarType = [
  'standartGuitar',
  'bassGuitar',
  'ukuleleGuitar'
]

const initialState = {
  guitarType: guitarType[1],
  guitarTypeList: guitarType,
  guitarConfig: guitars["standartGuitar"],

  trainingStart: false,
  stage: guitarStage[0],
  questionNote: false,
  userAnswer: false,
  showAllNotes:false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_TRAIN:
      return {
        ...state,
        trainingStart: true,
        stage: guitarStage[1],
        questionNote: generateNoteQuestion(
          state.guitarConfig,
          state.questionNote
        ),
        showAllNotes:false,
      };
    case actionTypes.END_TRAIN:
      return {
        ...state,
        trainingStart: false,
        showAllNotes:false,
        stage: guitarStage[0],
        userAnswer: false
      };
    case actionTypes.USER_SELECTED_NOTE_START:
      const { userAnswerNote } = action.payload;
      return {
        ...state,
        stage: guitarStage[2],
        userAnswer: verifyCorrectUserAnswer(userAnswerNote, state.questionNote)
      };
    case actionTypes.USER_SELECTED_NOTE_END:
      if(!state.trainingStart){
        return {...state}
      }
      return {
          ...state,
          stage:guitarStage[1],
          userAnswer: false,
          questionNote: generateNoteQuestion(
            state.guitarConfig,
            state.questionNote
          )
      };
    case actionTypes.SEE_ALL_NOTES_ON_NECK:
      return {
        ...state,
        showAllNotes:!state.showAllNotes,
        stage: guitarStage[0],
        userAnswer: false,
        trainingStart: false,//?
      }
    case actionTypes.CHANGE_GUITAR_TYPE:
      return {
        ...state,
        stage: guitarStage[0],
        userAnswer: false,
        trainingStart: false,
        guitarType: action.payload.guitarType,
        guitarConfig: guitars[action.payload.guitarType]
      }

    default:
      return state;
  }
};
