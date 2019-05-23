/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Gallery from '../client/components/Gallery';
import Photos from '../client/components/Photos';
import Modal from '../client/components/Modal';
import ShowGridModalBox from '../client/components/ShowGridModalBox';

const mockData = {
  name: 'Restaurant 1',
  photos: ['image1url', 'image2url', 'image3url', 'image4url', 'image5url', 'image6url', 'image7url'],
};
const mockImages = mockData.photos;

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  json: () => Promise.resolve(mockData),
}));

describe('Gallery Component', () => {
  test('renders', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper.exists()).toBe(true);
  });

  test('renders <Photos /> component', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper.find(Photos)).toHaveLength(1);
  });

  test('renders <ShowGridModalBox /> component', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper.find(ShowGridModalBox)).toHaveLength(1);
  });
});

describe('Photos Component', () => {
  const openModal = () => { };

  test('renders', () => {
    const wrapper = shallow(<Photos images={mockImages} openModal={openModal} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('doesn\'t break without images', () => {
    const wrapper = shallow(<Photos openModal={openModal} />);
    expect(wrapper.find('.photos-container div')).toHaveLength(0);
  });

  test('doesn\'t break with an empty array', () => {
    const wrapper = shallow(<Photos images={[]} openModal={openModal} />);
    expect(wrapper.find('.photos-container div')).toHaveLength(0);
  });

  test('handles clicks on any photo', () => {
    const openModalStub = sinon.spy();
    const wrapper = mount(<Photos images={mockImages} openModal={openModalStub} />);
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.find(`.img-${randomNum}`).simulate('click');
    expect(openModalStub.calledOnce).toBe(true);
  });
});

describe('Modal Component', () => {
  test('renders', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper.exists()).toBe(true);
  });
});

describe('ShowGridModalBox Component', () => {
  test('renders', () => {
    const wrapper = shallow(<ShowGridModalBox />);
    expect(wrapper.exists()).toBe(true);
  });

  test('renders the correct number of photos', () => {
    const wrapper = shallow(<ShowGridModalBox />);
    wrapper.setProps({ images: mockImages });
    const displayedNum = Number(wrapper.find('.show-grid-modal-box').text().slice(0, 1));
    expect(displayedNum).toBe(mockImages.length);
  });
});

// TODO:
// SHOW GRID MODAL BOX
// renders
// renders correct number of photos

// SLIDESHOW MODAL
// renders
// renders title
// renders view box (and 3 components)
// renders correct current slide in viewbox
// renders correct total slide in viewbox
// renders correct image (set currSlide to 10, check that index of image is also 10?)
// renders buttons
// renders next slide when right button is clicked (and to 0 when at end of slide)
// renders previous slide when left button is clicked (and to last slide when at 0)

// GRID MODAL
// renders
// renders title
// renders close modal button
// renders all images (check length)
