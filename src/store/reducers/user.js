import * as actionTypes from "../actions/actionTypes";

const initialState = {
    userStatistic: {
        answers: {
            standartGuitar: {
                correct: 0,
                wrong: 0,
                all: 0
            },
            bassGuitar: {
                correct: 0,
                wrong: 0,
                all: 0
            },
            ukuleleGuitar: {
                correct: 0,
                wrong: 0,
                all: 0
            }
        }
    },
    userID: null,
    userUnswerTiming: {
        currentTiming: 2000,
        timingList: [1000, 2000, 3000, 5000]
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_INIT_LOAD:
            const {
                guitarType,
                userUnswerTiming:{currentTiming}, 
                ...restPayload
            } = action.payload;

            return {
                ...state,
                ...restPayload,
                userUnswerTiming:{
                    ...state.userUnswerTiming,
                    currentTiming
                }
            }
        case actionTypes.CHANGE_USER_ANSWER_TIMING:
            if (state.userUnswerTiming.timingList.includes(action.payload)) {
                return {
                    ...state,
                    userUnswerTiming: {
                        ...state.userUnswerTiming,
                        currentTiming: action.payload
                    }
                }
            }
            return state;
        default:
            return state;
    }
}