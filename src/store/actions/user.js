import * as actionTypes from './actionTypes';
import shortid from 'shortid';
import { setToLocalStorage, getFromLocalStorage} from '../../services/localStorage';

export const userInitLoad = () => {
    return dispatch => {
        let userID;
        if (getFromLocalStorage('guitarTrainer__userID').length) {
            userID = getFromLocalStorage('guitarTrainer__userID');
        } else {
            userID = shortid.generate();
            setToLocalStorage('guitarTrainer__userID', userID)
        }

        const payload = {
            userID
        }

        const userStatistic = getFromLocalStorage('guitarTrainer__userStatistic');
        if (typeof userStatistic !== 'undefined' && Object.keys(userStatistic).length !== 0){
            payload['userStatistic'] = userStatistic
        }

        const guitarType = getFromLocalStorage('guitarTrainer__guitarType');
        if (guitarType && guitarType.length){
            payload['guitarType'] = guitarType;
        }

        const userCurrentTiming = getFromLocalStorage('guitarTrainer__userUnswerTiming');
        if (typeof userCurrentTiming === 'number'){
            payload['userUnswerTiming'] = {
                currentTiming:userCurrentTiming
            }
        }

        const withoutSharps = getFromLocalStorage('guitarTrainer__withoutSharps');
        if (typeof withoutSharps === 'boolean'){
            payload['withoutSharps'] = withoutSharps;
        }
        
        dispatch({
            type: actionTypes.USER_INIT_LOAD,
            payload
        })

    }
}

export const changeUserAnswerTiming = userUnswerTiming => {
    setToLocalStorage('guitarTrainer__userUnswerTiming', userUnswerTiming);
    return {
        type: actionTypes.CHANGE_USER_ANSWER_TIMING,
        payload: userUnswerTiming
    };
}