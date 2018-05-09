import * as actionTypes from './actionTypes';
import shortid from 'shortid';
import { setToLocalStorage, getFromLocalStorage} from '../../services/localStorage';

export const userInitLoad = () => {
    return dispatch => {
        let userID;
        if (getFromLocalStorage('userID').length) {
            userID = getFromLocalStorage('userID');
        } else {
            userID = shortid.generate();
            setToLocalStorage('userID', userID)
        }

        const userStatistic = getFromLocalStorage('userStatistic');

        if (typeof userStatistic !== 'undefined' && Object.keys(userStatistic).length !== 0 && userStatistic.constructor === Object){

            dispatch({
                type: actionTypes.USER_INIT_LOAD,
                payload: {
                    userID,
                    userStatistic
                }
            })
        }else {
            dispatch({
                type: actionTypes.USER_INIT_LOAD,
                payload: {
                    userID
                }
            })
        }
    }
}