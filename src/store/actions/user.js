import * as actionTypes from './actionTypes';
import shortid from 'shortid';
import { setToLocalStorage, getFromLocalStorage} from '../../services/localStorage';

export const userInitLoad = () => {
    return dispatch => {
        let userID, userStatistic;
        if (getFromLocalStorage('userID').length) {
            userID = getFromLocalStorage('userID');
        } else {
            userID = shortid.generate();
            setToLocalStorage('userID', userID)
        }


        if (typeof getFromLocalStorage('userStatistic') !== 'undefined'){
            dispatch({
                type: actionTypes.USER_INIT_LOAD,
                payload: {
                    userID,
                    userStatistic: getFromLocalStorage('userStatistic')
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