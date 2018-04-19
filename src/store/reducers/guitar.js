import * as actionTypes from '../actions/actionTypes';
import * as guitars from '../../json/guitar.json';

import {generateNoteQuestion} from '../../services/guitarQuest';

const guitarStage = [
    null,
    'selectNote',
]

const initialState = {
    guitarType: 'standartGuitar',
    guitarConfig: guitars['standartGuitar'],
    
    trainingStart: false,
    stage: guitarStage[0],
    questionNote:false,
}

export default (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.START_TRAIN:
            return {
                ...state,
                trainingStart: true,
                stage:guitarStage[1],
                questionNote:generateNoteQuestion(state.guitarConfig,state.questionNote)
            };
        case actionTypes.END_TRAIN:
            return {
                ...state,
                trainingStart: false,
                stage:guitarStage[0],
            };


        default:
            return state;
    }
}