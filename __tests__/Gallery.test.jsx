import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Gallery from '../client/components/Gallery';

Enzyme.configure({ adapter: new Adapter() });

describe('Gallery Component', () => {
  const mockImages = { name: 'Restaurant 1', photos: ['image1url', 'image2url'] };

  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve(mockImages),
  }));

  test('renders', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper.exists()).toBe(true);
  });
});
