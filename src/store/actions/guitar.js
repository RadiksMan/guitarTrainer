import * as actionTypes from './actionTypes';
import { setToLocalStorage } from '../../services/localStorage';

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
    return (dispatch, getState) => {

        clearTimeout(userSelectNoteTimer)

        const {guitarAnswerTiming:{currentTiming}} = getState().guitar;

        dispatch({
            type: actionTypes.USER_SELECTED_NOTE_START,
            payload: {userAnswerNote}
        })

        userSelectNoteTimer = setTimeout(() => {
            const {stage} = getState().guitar;

            if (stage !== null){
                dispatch({
                    type: actionTypes.USER_SELECTED_NOTE_END
                })
            }
        }, currentTiming);
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

export const changeGuitarAnswerTiming = unswerTiming => {
    setToLocalStorage('guitarTrainer__unswerTiming', unswerTiming);
    return {
        type: actionTypes.CHANGE_GUITAR_ANSWER_TIMING,
        payload: unswerTiming
    };
}