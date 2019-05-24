/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Gallery from '../client/components/Gallery';
import Photos from '../client/components/Photos';
import Modal from '../client/components/Modal';
import ShowGridModalBox from '../client/components/ShowGridModalBox';
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
  test('renders', () => {
    const wrapper = shallow(<Photos images={mockImages} openModal={jest.fn()} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('doesn\'t break without images', () => {
    const wrapper = shallow(<Photos openModal={jest.fn()} />);
    expect(wrapper.find('.photos-container div')).toHaveLength(0);
  });

  test('doesn\'t break with an empty array', () => {
    const wrapper = shallow(<Photos images={[]} openModal={jest.fn()} />);
    expect(wrapper.find('.photos-container div')).toHaveLength(0);
  });

  test('handles clicks on any photo', () => {
    const openModalStub = sinon.spy();
    const wrapper = shallow(<Photos images={mockImages} openModal={openModalStub} />);
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    expect(openModalStub.calledOnce).toBe(false);
    wrapper.find(`.img-${randomNum}`).simulate('click');
    expect(openModalStub.calledOnce).toBe(true);
  });
});

describe('ShowGridModalBox Component', () => {
  test('renders', () => {
    const wrapper = shallow(<ShowGridModalBox openModal={jest.fn()} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('renders the correct number of photos', () => {
    const wrapper = shallow(<ShowGridModalBox openModal={jest.fn()} />);
    wrapper.setProps({ images: mockImages });
    const displayedNum = Number(wrapper.find('.show-grid-modal-box').text().split(' ')[0]);
    expect(displayedNum).toBe(mockImages.length);
  });

  test('handles clicks', () => {
    const openModalStub = sinon.spy();
    const wrapper = shallow(<ShowGridModalBox images={mockImages} openModal={openModalStub} />);
    expect(openModalStub.calledOnce).toBe(false);
    wrapper.find('.show-grid-modal-box').simulate('click');
    expect(openModalStub.calledOnce).toBe(true);
  });
});

describe('Modal Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Modal
      changeView={jest.fn()}
      prevSlide={jest.fn()}
      nextSlide={jest.fn()}
      closeModal={jest.fn()}
    />);
  });

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders slideshow modal', () => {
    wrapper.setProps({ view: 'slideshow' });
    expect(wrapper.find(SlideshowModal)).toHaveLength(1);
  });

  test('renders grid modal', () => {
    wrapper.setProps({ view: 'grid' });
    expect(wrapper.find(GridModal)).toHaveLength(1);
  });
});

describe('SlideshowModal Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SlideshowModal
      changeView={jest.fn()}
      prevSlide={jest.fn()}
      nextSlide={jest.fn()}
      closeModal={jest.fn()}
    />);
  });

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders restaurant name', () => {
    wrapper.setProps({ name: 'De Kas' });
    expect(wrapper.find('.modal-title').text()).toBe('De Kas');
  });

  test('renders slideshow button bar', () => {
    expect(wrapper.find('.button-bar')).toHaveLength(1);
  });

  test('renders the correct slide number', () => {
    wrapper.setProps({ currSlide: 1, images: mockImages });
    const text = wrapper.find('.slideshow-view-index').text().split(' ');
    expect(Number(text[0])).toBe(2);
    expect(Number(text[2])).toBe(mockImages.length);
  });

  test('renders the grid view button', () => {
    expect(wrapper.find('.open-grid-view')).toHaveLength(1);
  });

  test('handles clicks on the grid view button', () => {
    const changeViewStub = sinon.spy();
    wrapper.setProps({ changeView: changeViewStub });
    expect(changeViewStub.calledOnce).toBe(false);
    wrapper.find('.open-grid-svg').simulate('click');
    expect(changeViewStub.calledOnce).toBe(true);
  });

  test('renders the close modal button', () => {
    expect(wrapper.find('.close-modal')).toHaveLength(1);
  });

  test('handles clicks on the close modal button', () => {
    const closeModalStub = sinon.spy();
    wrapper.setProps({ closeModal: closeModalStub });
    expect(closeModalStub.calledOnce).toBe(false);
    wrapper.find('.close-modal').simulate('click');
    expect(closeModalStub.calledOnce).toBe(true);
  });

  test('renders the correct image', () => {
    wrapper.setProps({ currSlide: 4, images: mockImages });
    expect(wrapper.find('.slideshow-img img').prop('src')).toBe(mockImages[4]);
  });

  test('renders left arrow button', () => {
    expect(wrapper.find('.container-prev-slide')).toHaveLength(1);
  });

  test('handles clicks on left arrow button', () => {
    const prevSlideStub = sinon.spy();
    wrapper.setProps({ prevSlide: prevSlideStub });
    expect(prevSlideStub.calledOnce).toBe(false);
    wrapper.find('.container-prev-slide').simulate('click');
    expect(prevSlideStub.calledOnce).toBe(true);
  });

  test('renders right arrow button', () => {
    expect(wrapper.find('.container-next-slide')).toHaveLength(1);
  });

  test('handles clicks on right arrow button', () => {
    const nextSlideStub = sinon.spy();
    wrapper.setProps({ nextSlide: nextSlideStub });
    expect(nextSlideStub.calledOnce).toBe(false);
    wrapper.find('.container-next-slide').simulate('click');
    expect(nextSlideStub.calledOnce).toBe(true);
  });

  test('renders footer', () => {
    expect(wrapper.find('.slideshow-footer')).toHaveLength(1);
    expect(wrapper.find('.slideshow-user-avatar')).toHaveLength(1);
    expect(wrapper.find('.slideshow-user-name')).toHaveLength(1);
  });
});

describe('GridModal Component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GridModal
      closeModal={jest.fn()}
      changeView={jest.fn()}
    />);
  });

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('renders restaurant name', () => {
    wrapper.setProps({ name: 'De Kas' });
    expect(wrapper.find('.modal-title').text()).toBe('De Kas');
  });

  test('renders the close modal button', () => {
    expect(wrapper.find('.close-modal')).toHaveLength(1);
  });

  test('handles clicks on the close modal button', () => {
    const closeModalStub = sinon.spy();
    wrapper.setProps({ closeModal: closeModalStub });
    expect(closeModalStub.calledOnce).toBe(false);
    wrapper.find('.close-modal').simulate('click');
    expect(closeModalStub.calledOnce).toBe(true);
  });

  test('renders all images', () => {
    wrapper.setProps({ images: mockImages });
    expect(wrapper.find('.modal-img')).toHaveLength(mockImages.length);
  });

  test('handles clicks on any image', () => {
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    const changeViewStub = sinon.spy();
    wrapper.setProps({ changeView: changeViewStub, images: mockImages });
    expect(changeViewStub.calledOnce).toBe(false);
    wrapper.find('.modal-img').at(randomNum - 1).simulate('click');
    expect(changeViewStub.calledOnce).toBe(true);
  });
});
