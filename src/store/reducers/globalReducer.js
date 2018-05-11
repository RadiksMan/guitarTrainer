import * as actionTypes from "../actions/actionTypes";
import { setToLocalStorage } from '../../services/localStorage';

const globalReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.USER_SELECTED_NOTE_START:

            const { userAnswer: { userAnswerCorrect }, guitarType} = state.guitar;
            let {userStatistic:{answers}} = state.user;

            userAnswerCorrect ? answers[guitarType]['correct']++ : answers[guitarType]['wrong']++;
            answers[guitarType]['all']++;

            setToLocalStorage('guitarTrainer__userStatistic',{
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