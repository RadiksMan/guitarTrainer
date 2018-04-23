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
  //"showAnswerEnd" //3 - user stops seeing correct/uncorrect "answer"
];

const initialState = {
  guitarType: "standartGuitar",
  guitarConfig: guitars["standartGuitar"],

  trainingStart: false,
  stage: guitarStage[0],
  questionNote: false,
  userAnswer: false
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
        )
      };
    case actionTypes.END_TRAIN:
      return {
        ...state,
        trainingStart: false,
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
    default:
      return state;
  }
};
