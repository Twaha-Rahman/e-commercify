import { h } from 'preact';
import Navbar from '../src/components/Navbar';
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme';

describe('Initial Test of the Navbar', () => {
  test('Navbar renders 5 items', () => {
    const context = shallow(<Navbar />);
    expect(context.find('Link').length).toBe(5);
  });
});
