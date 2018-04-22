import * as actionTypes from './actionTypes';

const ANSWER_TIMING = 3000;

export const trainStart = () => {
    return {
        type: actionTypes.START_TRAIN
    };
};
export const trainEnd = () => {
    return {
        type: actionTypes.END_TRAIN
    };
};
export const userSelectedNote = userAnswerNote => {
    return dispatch => {

        dispatch({
            type: actionTypes.USER_SELECTED_NOTE_START,
            payload: {userAnswerNote}
        })

        setTimeout(() => {
            dispatch({
                type: actionTypes.USER_SELECTED_NOTE_END
            })
        }, ANSWER_TIMING);
    }
}