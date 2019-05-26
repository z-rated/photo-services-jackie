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
    expect(wrapper.find('RestaurantPhoto')).toHaveLength(0);
  });

  test('doesn\'t break with an empty array', () => {
    const wrapper = shallow(<Photos images={[]} openModal={jest.fn()} />);
    expect(wrapper.find('RestaurantPhoto')).toHaveLength(0);
  });

  test('handles clicks on any photo', () => {
    const openModalStub = sinon.spy();
    const wrapper = shallow(<Photos images={mockImages} openModal={openModalStub} />);
    const randomNum = Math.floor(Math.random() * mockImages.length);
    expect(openModalStub.calledOnce).toBe(false);
    wrapper.find('RestaurantPhoto').at(randomNum).simulate('click');
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
    const displayedNum = Number(wrapper.find('OpenGridBox').text().split(' ')[0]);
    expect(displayedNum).toBe(mockImages.length);
  });

  test('handles clicks', () => {
    const openModalStub = sinon.spy();
    const wrapper = shallow(<ShowGridModalBox images={mockImages} openModal={openModalStub} />);
    expect(openModalStub.calledOnce).toBe(false);
    wrapper.find('OpenGridBox').simulate('click');
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
    expect(wrapper.find('ModalTitle').text()).toBe('De Kas');
  });

  test('renders slideshow button bar', () => {
    expect(wrapper.find('ButtonBar')).toHaveLength(1);
  });

  test('renders the correct slide number', () => {
    wrapper.setProps({ currSlide: 1, images: mockImages });
    const text = wrapper.find('SlideshowViewIndex').text().split(' ');
    expect(Number(text[0])).toBe(2);
    expect(Number(text[2])).toBe(mockImages.length);
  });

  test('renders the grid view button', () => {
    expect(wrapper.find('GridIcon')).toHaveLength(1);
  });

  test('handles clicks on the grid view button', () => {
    const changeViewStub = sinon.spy();
    wrapper.setProps({ changeView: changeViewStub });
    expect(changeViewStub.calledOnce).toBe(false);
    wrapper.find('GridIcon').simulate('click');
    expect(changeViewStub.calledOnce).toBe(true);
  });

  test('renders the close modal button', () => {
    expect(wrapper.find('CloseModalIcon')).toHaveLength(1);
  });

  test('handles clicks on the close modal button', () => {
    const closeModalStub = sinon.spy();
    wrapper.setProps({ closeModal: closeModalStub });
    expect(closeModalStub.calledOnce).toBe(false);
    wrapper.find('CloseModalIcon').simulate('click');
    expect(closeModalStub.calledOnce).toBe(true);
  });

  test('renders the correct image', () => {
    wrapper.setProps({ currSlide: 4, images: mockImages });
    expect(wrapper.find('SlideshowViewer img').prop('src')).toBe(mockImages[4]);
  });

  test('renders left arrow button', () => {
    expect(wrapper.find('PrevSlideBtn')).toHaveLength(1);
  });

  test('handles clicks on left arrow button', () => {
    const prevSlideStub = sinon.spy();
    wrapper.setProps({ prevSlide: prevSlideStub });
    expect(prevSlideStub.calledOnce).toBe(false);
    wrapper.find('PrevSlideBtn').simulate('click');
    expect(prevSlideStub.calledOnce).toBe(true);
  });

  test('renders right arrow button', () => {
    expect(wrapper.find('NextSlideBtn')).toHaveLength(1);
  });

  test('handles clicks on right arrow button', () => {
    const nextSlideStub = sinon.spy();
    wrapper.setProps({ nextSlide: nextSlideStub });
    expect(nextSlideStub.calledOnce).toBe(false);
    wrapper.find('NextSlideBtn').simulate('click');
    expect(nextSlideStub.calledOnce).toBe(true);
  });

  test('renders footer', () => {
    expect(wrapper.find('SlideshowFooter')).toHaveLength(1);
    expect(wrapper.find('SlideshowUserAvatar')).toHaveLength(1);
    expect(wrapper.find('SlideshowUserName')).toHaveLength(1);
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
    expect(wrapper.find('ModalTitle').text()).toBe('De Kas');
  });

  test('renders the close modal button', () => {
    expect(wrapper.find('CloseModalIcon')).toHaveLength(1);
  });

  test('handles clicks on the close modal button', () => {
    const closeModalStub = sinon.spy();
    wrapper.setProps({ closeModal: closeModalStub });
    expect(closeModalStub.calledOnce).toBe(false);
    wrapper.find('CloseModalIcon').simulate('click');
    expect(closeModalStub.calledOnce).toBe(true);
  });

  test('renders all images', () => {
    wrapper.setProps({ images: mockImages });
    expect(wrapper.find('GridModalPhoto')).toHaveLength(mockImages.length);
  });

  test('handles clicks on any image', () => {
    const randomNum = Math.ceil(Math.random() * mockImages.length);
    const changeViewStub = sinon.spy();
    wrapper.setProps({ changeView: changeViewStub, images: mockImages });
    expect(changeViewStub.calledOnce).toBe(false);
    wrapper.find('GridModalPhoto').at(randomNum - 1).simulate('click');
    expect(changeViewStub.calledOnce).toBe(true);
  });
});
