import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.shallow = shallow;
global.render = render;
global.mount = mount;

Enzyme.configure({ adapter: new Adapter() });

console.error = message => {
    throw new Error(message);
};