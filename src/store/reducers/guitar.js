import * as actionTypes from '../actions/actionTypes';
import * as guitars from '../../json/guitar.json';

const initialState = {
    trainingStart:false,
    guitarType:'standartGuitar',
    guitarConfig:guitars['standartGuitar']
}


export default (state = initialState, action) => {
    console.log('initialState', initialState)
    switch(action.type){
        
        case actionTypes.START_TRAIN:
            return{
                ...state,
                trainingStart:true,
            };
        

        default:
        return state;
    }
}