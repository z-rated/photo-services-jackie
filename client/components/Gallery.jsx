import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import Photos from './Photos';
import ShowGridModalBox from './ShowGridModalBox';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      restaurantName: '',
      imageUrls: [],
      showModal: false,
      modalView: 'slideshow',
      transitionEnter: '',
      transitionExit: '',
      currSlide: 0,
    };

    this.getPhotos = this.getPhotos.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
        transitionEnter: 'zoomIn',
        transitionExit: '',
        currSlide: index,
      });
    } else {
      this.setState({
        showModal: true,
        modalView: style,
        transitionEnter: 'zoomIn',
        transitionExit: '',
      });
    }
  }

  closeModal() {
    this.setState({
      transitionExit: 'zoomOut',
    }, () => setTimeout(() => {
      this.setState({
        showModal: false,
      });
    }, 300));
  }

  render() {
    const {
      restaurantName, modalView, transitionEnter, transitionExit, imageUrls, showModal, currSlide,
    } = this.state;
    return (
      <div className="gallery-container">
        <Photos images={imageUrls} openModal={this.openModal} />
        {showModal && (
          <Modal
            name={restaurantName}
            view={modalView}
            transitionEnter={transitionEnter}
            transitionExit={transitionExit}
            images={imageUrls}
            currSlide={currSlide}
            closeModal={this.closeModal}
          />
        )}
        <ShowGridModalBox images={imageUrls} openModal={this.openModal} />
      </div>
    );
  }
}

ReactDOM.render(<Gallery />, document.getElementById('gallery'));
