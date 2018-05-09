import * as actionTypes from "../actions/actionTypes";

const initialState = {
    userStatistic: {
        answers: {
            standartGuitar: {
                correct: 0,
                wrong: 0,
                all: 0
            },
            bassGuitar:{
                correct: 0,
                wrong: 0,
                all: 0
            },
            ukuleleGuitar:{
                correct: 0,
                wrong: 0,
                all: 0
            }
        }
    },
    userID: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_INIT_LOAD:
            console.log('action.payload', action.payload)
            return {
                ...state,
                ...action.payload

            }

        default:
            return state;
    }
}