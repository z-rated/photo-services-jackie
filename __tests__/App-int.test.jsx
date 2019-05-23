/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Gallery from '../client/components/Gallery';
import Photos from '../client/components/Photos';
import Modal from '../client/components/Modal';

const mockData = {
  name: 'Restaurant 1',
  photos: ['image1url', 'image2url', 'image3url', 'image4url', 'image5url', 'image6url', 'image7url'],
};
const mockImages = mockData.photos;

window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
  json: () => Promise.resolve(mockImages),
}));

describe('Displays modal', () => {
  test('renders Modal Component when showModal is true', () => {
    const wrapper = shallow(<Gallery />);
    wrapper.setState({ showModal: true }, () => {
      expect(wrapper.find(Modal)).toHaveLength(1);
    });
  });

  test('does not render Modal Component when showModal is false', () => {
    const wrapper = shallow(<Gallery />);
    wrapper.setState({ showModal: false }, () => {
      expect(wrapper.find(Modal)).toHaveLength(0);
    });
  });

  // test('sets showModal state to true any photo in the gallery is clicked', () => {
  //   const galleryWrapper = mount(<Gallery />);
  //   const photosWrapper = shallow(<Photos images={mockImages} />);
  //   const randomNum = Math.ceil(Math.random() * 7);
  //   console.log('num is', randomNum);
  //   photosWrapper.find(`.img-${randomNum}`).simulate('click');
  //   console.log(galleryWrapper.state().showModal);
  //   // expect(galleryWrapper.state().showModal).to.equal(true);
  //   // console.log(mount(<Photos images={mockImages} />).debug());
  //   // PhotosWrapper.find(`.img-${randomNum}`).simulate('click');
  // });
});

// TODO:
// FETCH IMAGES
// calls fetch with the correct data when page loads
// sets [] as imageUrls if fetch fails
// updates state after fetch request (imageUrls and restaurant name)
// renders images upon mount

// DISPLAYING MODAL
// sets showModal state to true when photos are clicked
// sets showModal state to true when show-grid-box is clicked
// renders entire Modal Component when showModal is true
// renders slideshow Modal when photos are clicked
// renders grid Modal when show-grid-box is clicked
// closes Modal Component when showModal is false

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
