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
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.find(`.img-${randomNum}`).simulate('click');
    expect(wrapper.state('showModal')).toEqual(true);
    expect(wrapper.state('modalView')).toEqual('slideshow');
    expect(wrapper.find(SlideshowModal)).toHaveLength(1);
  });

  test('renders grid modal on \'X PHOTOS +\' click', () => {
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

describe('Rendering in slideshow modal view', () => {
  let wrapper;
  let randomNum;
  beforeEach(() => {
    wrapper = mount(<Gallery />);
    wrapper.setState({ imageUrls: mockImages });
    randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.find(`.img-${randomNum}`).simulate('click');
  });

  test('sets current slide in state to correct slide', () => {
    expect(wrapper.state('currSlide')).toBe(randomNum - 1);
  });

  test('displays the correct slide numbers', () => {
    const text = wrapper.find('.slideshow-view-index').text().split(' ');
    const currSlide = Number(text[0]);
    const totalSlides = Number(text[2]);
    expect(currSlide).toEqual(randomNum);
    expect(totalSlides).toEqual(mockImages.length);
  });

  test('renders the correct slide', () => {
    expect(wrapper.find('.slideshow-img img').prop('src')).toBe(mockImages[randomNum - 1]);
  });

  test('displays previous slide on left arrow button click', () => {
    const currSlide = wrapper.state('currSlide');
    const prevSlide = currSlide === 0 ? mockImages.length - 1 : currSlide - 1;
    wrapper.find('.container-prev-slide').simulate('click');
    expect(wrapper.state('currSlide')).toBe(prevSlide);
    expect(wrapper.find('.slideshow-img img').prop('src')).toBe(mockImages[prevSlide]);
  });

  test('displays last slide if on first slide', () => {
    wrapper.find('.img-1').simulate('click');
    const prevSlide = mockImages.length - 1;
    wrapper.find('.container-prev-slide').simulate('click');
    expect(wrapper.state('currSlide')).toBe(prevSlide);
    expect(wrapper.find('.slideshow-img img').prop('src')).toBe(mockImages[prevSlide]);
  });

  test('displays next slide on right arrow button click', () => {
    const currSlide = wrapper.state('currSlide');
    const nextSlide = (currSlide + 1) % mockImages.length;
    wrapper.find('.container-next-slide').simulate('click');
    expect(wrapper.state('currSlide')).toBe(nextSlide);
    expect(wrapper.find('.slideshow-img img').prop('src')).toBe(mockImages[nextSlide]);
  });

  test('displays first slide if on last slide', () => {
    wrapper.find('.img-7').simulate('click');
    wrapper.find('.container-next-slide').simulate('click');
    expect(wrapper.state('currSlide')).toBe(0);
    expect(wrapper.find('.slideshow-img img').prop('src')).toBe(mockImages[0]);
  });

  test('switches to grid view on grid button click', () => {
    wrapper.find('.open-grid-svg').simulate('click');
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
    wrapper.find('.show-grid-modal-box').simulate('click');
  });

  test('renders all images', () => {
    expect(wrapper.find('.modal-img')).toHaveLength(mockImages.length);
  });

  test('switches to slideshow view on any image click', () => {
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.find('.modal-img').at(randomNum - 1).simulate('click');
    expect(wrapper.state('modalView')).toBe('slideshow');
    expect(wrapper.find(GridModal)).toHaveLength(0);
    expect(wrapper.find(SlideshowModal)).toHaveLength(1);
  });

  test('switches to the correct slide in slideshow on image click', () => {
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    wrapper.find('.modal-img').at(randomNum - 1).simulate('click');
    expect(wrapper.state('currSlide')).toBe(randomNum - 1);
  });
});

describe('Transition effects for slideshow modal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Gallery />);
    wrapper.setState({ imageUrls: mockImages });
    wrapper.find('.img-1').simulate('click');
  });

  test('adds zoomIn class to Modal component on open', () => {
    expect(wrapper.find('.modal').hasClass('zoomIn')).toBe(true);
  });

  test('adds zoomOut class to slideshow image on close', () => {
    wrapper.find('.close-modal').simulate('click');
    expect(wrapper.find('.slideshow-photo-view').hasClass('zoomOut')).toBe(true);
    expect(wrapper.find('.modal').hasClass('zoomIn')).toBe(false);
  });
});

describe('Transition effects for grid modal', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Gallery />);
    wrapper.setState({ imageUrls: mockImages });
    wrapper.find('.show-grid-modal-box').simulate('click');
  });

  test('adds zoomIn class to Modal component on open', () => {
    expect(wrapper.find('.modal').hasClass('zoomIn')).toBe(true);
  });

  test('adds zoomOut class to GridModal component on close', () => {
    wrapper.find('.close-modal').simulate('click');
    expect(wrapper.find('.grid-photo-view').hasClass('zoomOut')).toBe(true);
    expect(wrapper.find('.modal').hasClass('zoomIn')).toBe(false);
  });
});

// TODO:
// FETCH IMAGES
// calls fetch with the correct data when page loads
// sets [] as imageUrls if fetch fails
// updates state after fetch request (imageUrls and restaurant name)
// renders images upon mount
