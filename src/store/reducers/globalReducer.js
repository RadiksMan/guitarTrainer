import * as actionTypes from "../actions/actionTypes";
import { setToLocalStorage } from '../../services/localStorage';

const globalReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.USER_SELECTED_NOTE_START:

            const { userAnswer: { userAnswerCorrect}} = state.guitar;
            let {userStatistic:{answers}} = state.user;

            userAnswerCorrect ? answers['correct']++ : answers['wrong']++;
            answers['all']++;

            setToLocalStorage('userStatistic',{
                ...state.user.userStatistic,
                answers
            })

            return {
                ...state,
                user:{
                    ...state.user,
                    userStatistic:{
                        ...state.user.userStatistic,
                        answers
                    }
                }
            }

        default:
            return state;
    }
};

export default globalReducer;