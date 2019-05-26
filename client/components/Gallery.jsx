import React from 'react';
import Modal from './Modal';
import Photos from './Photos';
import ShowGridModalBox from './ShowGridModalBox';
import GalleryContainer from '../styled/Gallery';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      restaurantName: '',
      imageUrls: [],
      showModal: false,
      modalView: 'slideshow',
      handleEnter: false,
      handleExit: false,
      currSlide: 0,
    };

    this.getPhotos = this.getPhotos.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.changeView = this.changeView.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  componentDidMount() {
    this.getPhotos();
  }

  getPhotos() {
    const { id } = this.state;
    fetch(`/api/restaurants/${id}/photos`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(data => (data.json()))
      .then((data) => {
        this.setState({
          restaurantName: data.name,
          imageUrls: data.photos,
        });
      });
  }

  openModal(style, index) {
    if (style === 'slideshow') {
      this.setState({
        showModal: true,
        modalView: style,
        handleEnter: true,
        handleExit: false,
        currSlide: index,
      });
    } else {
      this.setState({
        showModal: true,
        modalView: style,
        handleEnter: true,
        handleExit: false,
      });
    }
  }

  closeModal() {
    this.setState({
      handleEnter: false,
      handleExit: true,
    }, () => setTimeout(() => {
      this.setState({
        showModal: false,
      });
    }, 300));
  }

  changeView(style, index) {
    if (style === 'slideshow') {
      this.setState({
        modalView: 'slideshow',
        currSlide: index,
      });
    } else {
      this.setState({
        modalView: 'grid',
      });
    }
  }

  prevSlide() {
    const { currSlide, imageUrls } = this.state;
    const n = imageUrls.length;
    if (currSlide === 0) {
      this.setState({
        currSlide: n - 1,
      });
    } else {
      const prevSlide = currSlide - 1;
      this.setState({
        currSlide: prevSlide,
      });
    }
  }

  nextSlide() {
    const { currSlide, imageUrls } = this.state;
    const n = imageUrls.length;
    const nextSlide = (currSlide + 1) % (n);
    this.setState({
      currSlide: nextSlide,
    });
  }

  render() {
    const {
      restaurantName, modalView, handleEnter, handleExit, imageUrls, showModal, currSlide,
    } = this.state;
    return (
      <GalleryContainer>
        <Photos images={imageUrls} openModal={this.openModal} />
        {showModal && (
          <Modal
            name={restaurantName}
            view={modalView}
            handleEnter={handleEnter}
            handleExit={handleExit}
            images={imageUrls}
            currSlide={currSlide}
            closeModal={this.closeModal}
            changeView={this.changeView}
            prevSlide={this.prevSlide}
            nextSlide={this.nextSlide}
          />
        )}
        <ShowGridModalBox images={imageUrls} openModal={this.openModal} />
      </GalleryContainer>
    );
  }
}

export default Gallery;
