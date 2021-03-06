import * as actionTypes from "../actions/actionTypes";
import * as guitars from "../../json/guitar.json";

import {
  generateNoteQuestion,
  verifyCorrectUserAnswer,
  generateWithoutSharps
} from "../../services/guitarQuest";


const guitarStage = [
  null, //0 - init state
  "showQuestion", //1 - user start the train and sees question icon on guitar neck
  "showAnswer", //2 - user select answer note and see correct/uncorrect "answer"
];

const guitarTypeList = [
  'standartGuitar',
  'bassGuitar',
  'ukuleleGuitar'
]

const initialState = {
  guitarType: guitarTypeList[0],
  guitarTypeList: guitarTypeList,
  guitarConfig: guitars[guitarTypeList[0]],
  withoutSharps: false,

  trainingStart: false,
  stage: guitarStage[0],
  questionNote: false,
  userAnswer: false,
  showAllNotes: false,
};

export default (state = initialState, action) => {

  console.log("action.type ", action.type);
  switch (action.type) {
    case actionTypes.START_TRAIN:
      return {
        ...state,
        trainingStart: true,
        stage: guitarStage[1],
        questionNote: generateNoteQuestion(
          state.withoutSharps ? generateWithoutSharps(state.guitarType) : state.guitarConfig,
          state.questionNote
        ),
        showAllNotes: false,
      };
    case actionTypes.END_TRAIN:
      return {
        ...state,
        trainingStart: false,
        showAllNotes: false,
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

      if (!state.trainingStart) {
        return state;
      }
      return {
        ...state,
        stage: guitarStage[1],
        userAnswer: false,
        questionNote: generateNoteQuestion(
          state.withoutSharps ? generateWithoutSharps(state.guitarType) : state.guitarConfig,
          state.questionNote
        )
      };
    case actionTypes.SEE_ALL_NOTES_ON_NECK:
      return {
        ...state,
        showAllNotes: !state.showAllNotes,
        stage: guitarStage[0],
        userAnswer: false,
        trainingStart: false,
      }
    case actionTypes.CHANGE_GUITAR_TYPE:
      return {
        ...state,
        stage: guitarStage[0],
        userAnswer: false,
        trainingStart: false,
        guitarType: action.payload.guitarType,
        guitarConfig: state.withoutSharps ? generateWithoutSharps(action.payload.guitarType) : guitars[action.payload.guitarType]
      }
    case actionTypes.CHANGE_GUITAR_SHARP_VISIBILITY:

      const { withoutSharps } = action.payload;

      return {
        ...state,
        withoutSharps,
        stage: guitarStage[0],
        userAnswer: false,
        trainingStart: false,
        guitarConfig: withoutSharps ? generateWithoutSharps(state.guitarType) : guitars[state.guitarType]
      }

    case actionTypes.USER_INIT_LOAD:
      //USER_INIT_LOAD(from user reducers) - detect what guitarType load
      const {
        guitarType = guitarTypeList[0],
        withoutSharps: withoutSharpsLoad = false
      } = action.payload;
      
      let stateLoad =  {
        ...state,
        withoutSharps:withoutSharpsLoad,
        guitarConfig: withoutSharpsLoad ? generateWithoutSharps(guitarType) : guitars[guitarType]
      }

      if(guitarType !== state.guitarType){
        stateLoad['guitarType'] = guitarType;
      }
      
      return stateLoad;


    default:
      return state;
  }
};
