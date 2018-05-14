import * as actionTypes from './actionTypes';
import { setToLocalStorage } from '../../services/localStorage';

const ANSWER_TIMING = 3000;
let userSelectNoteTimer;

export const trainStart = () => {
    return {
        type: actionTypes.START_TRAIN
    };
}

export const trainEnd = () => {
    return {
        type: actionTypes.END_TRAIN
    };
}

export const userSelectedNote = userAnswerNote => {
    return dispatch => {
        clearTimeout(userSelectNoteTimer)
        dispatch({
            type: actionTypes.USER_SELECTED_NOTE_START,
            payload: {userAnswerNote}
        })

        userSelectNoteTimer = setTimeout(() => {
            dispatch({
                type: actionTypes.USER_SELECTED_NOTE_END
            })
        }, ANSWER_TIMING);
    };
}

export const toggleShowAllNotes = () => {
    return {
        type: actionTypes.SEE_ALL_NOTES_ON_NECK
    };
}

export const changeGuitarType = guitarType => {

    setToLocalStorage('guitarTrainer__guitarType', guitarType);

    return {
        type: actionTypes.CHANGE_GUITAR_TYPE,
        payload: { guitarType }
    };
}