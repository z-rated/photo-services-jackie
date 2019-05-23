/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Gallery from '../client/components/Gallery';
import Photos from '../client/components/Photos';
import Modal from '../client/components/Modal';
import SlideshowModal from '../client/components/SlideshowModal';
import GridModal from '../client/components/GridModal';

const mockData = {
  name: 'Restaurant 1',
  photos: ['image1url', 'image2url', 'image3url', 'image4url', 'image5url', 'image6url', 'image7url'],
};
const mockImages = mockData.photos;

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  json: () => Promise.resolve(mockImages),
}));

describe('Display modal by state', () => {
  test('renders modal when showModal is true', () => {
    const wrapper = shallow(<Gallery />);
    wrapper.setState({ showModal: true }, () => {
      expect(wrapper.find(Modal)).toHaveLength(1);
    });
  });

  test('does not render modal when showModal is false', () => {
    const wrapper = shallow(<Gallery />);
    wrapper.setState({ showModal: false }, () => {
      expect(wrapper.find(Modal)).toHaveLength(0);
    });
  });
});

describe('Display modal by click events', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Gallery />);
    wrapper.setState({ imageUrls: mockImages });
  });

  test('renders slideshow modal when any photo is clicked', () => {
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.find(`.img-${randomNum}`).simulate('click');
    expect(wrapper.state('showModal')).toEqual(true);
    expect(wrapper.state('modalView')).toEqual('slideshow');
    expect(wrapper.find(SlideshowModal)).toHaveLength(1);
  });

  test('renders grid modal when X PHOTOS button is clicked', () => {
    wrapper.find('.show-grid-modal-box').simulate('click');
    expect(wrapper.state('showModal')).toEqual(true);
    expect(wrapper.state('modalView')).toEqual('grid');
    expect(wrapper.find(GridModal)).toHaveLength(1);
  });

  test('closes grid modal when close button is clicked', () => {
    wrapper.find('.show-grid-modal-box').simulate('click');
    expect(wrapper.state('showModal')).toEqual(true);
    wrapper.find('.close-modal').simulate('click');
    setTimeout(() => {
      expect(wrapper.find(Modal)).toHaveLength(0);
      expect(wrapper.find(GridModal)).toHaveLength(0);
      expect(wrapper.state('showModal')).toEqual(false);
    }, 500);
  });

  test('closes slideshow modal when close button is clicked', () => {
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.find(`.img-${randomNum}`).simulate('click');
    expect(wrapper.state('showModal')).toEqual(true);
    wrapper.find('.close-modal').simulate('click');
    setTimeout(() => {
      expect(wrapper.find(Modal)).toHaveLength(0);
      expect(wrapper.find(SlideshowModal)).toHaveLength(0);
      expect(wrapper.state('showModal')).toEqual(false);
    }, 500);
  });
});

describe('Rendering in slideshow modal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Modal images={mockImages} view="slideshow" />);
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.setState({ currSlide: randomNum });
  });

  test('renders slideshow modal when any photo is clicked', () => {
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.find(`.img-${randomNum}`).simulate('click');
    expect(wrapper.state('showModal')).toEqual(true);
    expect(wrapper.find(SlideshowModal)).toHaveLength(1);
  });


});

// TODO:
// FETCH IMAGES
// calls fetch with the correct data when page loads
// sets [] as imageUrls if fetch fails
// updates state after fetch request (imageUrls and restaurant name)
// renders images upon mount

// MODAL TRANSITIONS
// adds transitionEnter class to Modal components when opening modal
// adds transitionExit class to Modal components when closing
// resets state in between transitions

// SLIDESHOW MODAL
// renders slideshow Modal when modalView state is set to 'slideshow'
//    (randomize whichever photo is clicked on original page? beforeEach?)
// sets currSlide state to correct slide
// passes the correct currSlide to slideshowModal
// renders the correct slide
// updates modalView state to 'grid' when grid button is clicked -> switches to grid view
//    (in both MODAL and GALLERY)
// sets showModal to false when X button is clicked // closes modal AND slideshow modal

// GRID MODAL
// renders grid Modal when modalView state is set to 'grid'
// update modalView state to 'slideshow' whenever any photo is clicked -> switch view
//    (in both MODAL and GALLERY)
// sets showModal to false when X button is clicked // closes modal AND grid modal 
