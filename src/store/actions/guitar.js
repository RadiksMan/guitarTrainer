import * as actionTypes from './actionTypes';

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