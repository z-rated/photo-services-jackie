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
  json: () => Promise.resolve(mockData),
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

  test('renders slideshow modal on any image click', () => {
    const randomNum = Math.floor(Math.random() * mockImages.length);
    wrapper.find('RestaurantPhoto').at(randomNum).simulate('click');
    expect(wrapper.state('showModal')).toBe(true);
    expect(wrapper.state('modalView')).toBe('slideshow');
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find(SlideshowModal)).toHaveLength(1);
  });

  test('renders grid modal on \'X PHOTOS +\' click', () => {
    wrapper.find('OpenGridBox').simulate('click');
    expect(wrapper.state('showModal')).toBe(true);
    expect(wrapper.state('modalView')).toBe('grid');
    expect(wrapper.find(Modal)).toHaveLength(1);
    expect(wrapper.find(GridModal)).toHaveLength(1);
  });

  test('closes grid modal when close button is clicked', () => {
    wrapper.find('OpenGridBox').simulate('click');
    expect(wrapper.state('showModal')).toBe(true);
    wrapper.find('CloseModalIcon').simulate('click');
    setTimeout(() => {
      expect(wrapper.find(Modal)).toHaveLength(0);
      expect(wrapper.find(GridModal)).toHaveLength(0);
      expect(wrapper.state('showModal')).toBe(false);
    }, 500);
  });

  test('closes slideshow modal when close button is clicked', () => {
    const randomNum = Math.floor(Math.random() * mockImages.length);
    wrapper.find('RestaurantPhoto').at(randomNum).simulate('click');
    expect(wrapper.state('showModal')).toBe(true);
    wrapper.find('CloseModalIcon').simulate('click');
    setTimeout(() => {
      expect(wrapper.find(Modal)).toHaveLength(0);
      expect(wrapper.find(SlideshowModal)).toHaveLength(0);
      expect(wrapper.state('showModal')).toBe(false);
    }, 500);
  });
});

describe('Rendering in slideshow modal view', () => {
  let wrapper;
  let randomNum;
  beforeEach(() => {
    wrapper = mount(<Gallery />);
    wrapper.setState({ imageUrls: mockImages });
    randomNum = Math.floor(Math.random() * mockImages.length);
    wrapper.find('RestaurantPhoto').at(randomNum).simulate('click');
  });

  test('sets current slide in state to correct slide', () => {
    expect(wrapper.state('currSlide')).toBe(randomNum);
  });

  test('displays the correct slide numbers', () => {
    const text = wrapper.find('SlideshowViewIndex').text().split(' ');
    const currSlide = Number(text[0]);
    const totalSlides = Number(text[2]);
    expect(currSlide).toBe(randomNum + 1);
    expect(totalSlides).toBe(mockImages.length);
  });

  test('renders the correct slide', () => {
    expect(wrapper.find('SlideshowViewer img').prop('src')).toBe(mockImages[randomNum]);
  });

  test('displays previous slide on left arrow button click', () => {
    const currSlide = wrapper.state('currSlide');
    const prevSlide = currSlide === 0 ? mockImages.length - 1 : currSlide - 1;
    wrapper.find('PrevSlideBtn').simulate('click');
    expect(wrapper.state('currSlide')).toBe(prevSlide);
    expect(wrapper.find('SlideshowViewer img').prop('src')).toBe(mockImages[prevSlide]);
  });

  test('displays last slide if on first slide', () => {
    wrapper.find('RestaurantPhoto').first().simulate('click');
    const prevSlide = mockImages.length - 1;
    wrapper.find('PrevSlideBtn').simulate('click');
    expect(wrapper.state('currSlide')).toBe(prevSlide);
    expect(wrapper.find('SlideshowViewer img').prop('src')).toBe(mockImages[prevSlide]);
  });

  test('displays next slide on right arrow button click', () => {
    const currSlide = wrapper.state('currSlide');
    const nextSlide = (currSlide + 1) % mockImages.length;
    wrapper.find('NextSlideBtn').simulate('click');
    expect(wrapper.state('currSlide')).toBe(nextSlide);
    expect(wrapper.find('SlideshowViewer img').prop('src')).toBe(mockImages[nextSlide]);
  });

  test('displays first slide if on last slide', () => {
    wrapper.find('RestaurantPhoto').last().simulate('click');
    wrapper.find('NextSlideBtn').simulate('click');
    expect(wrapper.state('currSlide')).toBe(0);
    expect(wrapper.find('SlideshowViewer img').prop('src')).toBe(mockImages[0]);
  });

  test('switches to grid view on grid button click', () => {
    wrapper.find('GridIcon').simulate('click');
    expect(wrapper.state('modalView')).toBe('grid');
    expect(wrapper.find(SlideshowModal)).toHaveLength(0);
    expect(wrapper.find(GridModal)).toHaveLength(1);
  });
});

describe('Rendering in grid modal view', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Gallery />);
    wrapper.setState({ imageUrls: mockImages });
    wrapper.find('OpenGridBox').simulate('click');
  });

  test('renders all images', () => {
    expect(wrapper.find('GridModalPhoto')).toHaveLength(mockImages.length);
  });

  test('switches to slideshow view on any image click', () => {
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.find('GridModalPhoto').at(randomNum - 1).simulate('click');
    expect(wrapper.state('modalView')).toBe('slideshow');
    expect(wrapper.find(GridModal)).toHaveLength(0);
    expect(wrapper.find(SlideshowModal)).toHaveLength(1);
  });

  test('switches to the correct slide in slideshow on image click', () => {
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.find('GridModalPhoto').at(randomNum - 1).simulate('click');
    expect(wrapper.state('currSlide')).toBe(randomNum - 1);
  });
});

describe('Transition effects for slideshow modal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Gallery />);
    wrapper.setState({ imageUrls: mockImages });
    wrapper.find('RestaurantPhoto').first().simulate('click');
  });

  test('sets handleEnter to true when Modal is open', () => {
    expect(wrapper.find('ModalContainer').prop('handleEnter')).toBe(true);
  });

  test('sets handleExit to true when Modal is closed', () => {
    wrapper.find('CloseModalIcon').simulate('click');
    expect(wrapper.find('SlideshowViewer').prop('handleExit')).toBe(true);
    expect(wrapper.find('ModalContainer').prop('handleEnter')).toBe(false);
  });
});

describe('Transition effects for grid modal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Gallery />);
    wrapper.setState({ imageUrls: mockImages });
    wrapper.find('OpenGridBox').simulate('click');
  });

  test('sets handleEnter to true when Modal is open', () => {
    expect(wrapper.find('ModalContainer').prop('handleEnter')).toBe(true);
  });

  test('sets handleExit to true when Modal is closed', () => {
    wrapper.find('CloseModalIcon').simulate('click');
    expect(wrapper.find('GridViewer').prop('handleExit')).toBe(true);
    expect(wrapper.find('ModalContainer').prop('handleEnter')).toBe(false);
  });
});

// TODO:
// FETCH IMAGES
// calls fetch with the correct data when page loads
// sets [] as imageUrls if fetch fails
// updates state after fetch request (imageUrls and restaurant name)
// renders images upon mount
