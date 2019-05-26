import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Photos from './Photos';
import ShowGridModalBox from './ShowGridModalBox';

const GalleryContainer = styled.div`
  position: relative;
  margin-top: 80px;
  height: 400px;
  width: 100%;
  overflow: hidden;
`;

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      restaurantName: '',
      imageUrls: [],
      showModal: false,
      modalView: 'slideshow',
      onEnter: false,
      onExit: false,
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
        onEnter: true,
        onExit: false,
        currSlide: index,
      });
    } else {
      this.setState({
        showModal: true,
        modalView: style,
        onEnter: true,
        onExit: false,
      });
    }
  }

  closeModal() {
    this.setState({
      onEnter: false,
      onExit: true,
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
      restaurantName, modalView, onEnter, onExit, imageUrls, showModal, currSlide,
    } = this.state;
    return (
      <GalleryContainer>
        <Photos images={imageUrls} openModal={this.openModal} />
        {showModal && (
          <Modal
            name={restaurantName}
            view={modalView}
            onEnter={onEnter}
            onExit={onExit}
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
