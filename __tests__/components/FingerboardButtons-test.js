import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import React from 'react';
import FingerboardButtons from '../../src/components/Fingerboard/FingerboardButtons';

const initialState = {
    stage:null,
    questionNote:false
};
const mockStore = configureStore([thunk]);
const store = mockStore(initialState)

//let wrapper;

// beforeEach(() => {
//     wrapper = shallow(<FingerboardButtons store={store}/>)
// })

describe('Testing init component', () => {
    it('renders as expected', () => {
       const wrapper = shallow(<FingerboardButtons store={store} />)
        expect(wrapper.dive()).toMatchSnapshot();
    });
});