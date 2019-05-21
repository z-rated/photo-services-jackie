import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import Photos from './Photos.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 2,
      name: '',
      imageUrls: [],
      showModal: false,
      modalView: 'slideshow',
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
          name: data.name,
          imageUrls: data.photos,
        });
      });
  }

  openModal(style, index) {
    if (index >= 0) {
      this.setState({
        showModal: true,
        modalView: style,
        currSlide: index,
      });
    } else {
      this.setState({
        showModal: true,
        modalView: style,
      });
    }
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    const {
      name, modalView, imageUrls, showModal, currSlide,
    } = this.state;
    return (
      <div>
        <Photos images={imageUrls} openModal={this.openModal} />
        {showModal && (
          <Modal
            name={name}
            view={modalView}
            images={imageUrls}
            currSlide={currSlide}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}

ReactDOM.render(<Gallery />, document.getElementById('gallery'));
