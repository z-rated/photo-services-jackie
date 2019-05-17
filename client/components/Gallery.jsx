import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.jsx';
import Photos from './Photos.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 2,
      imageUrls: [],
      showModal: false,
      modalView: 'grid',
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
          imageUrls: data,
        });
      });
  }

  openModal(style) {
    this.setState({
      showModal: true,
      modalView: style,
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    return (
      <div>
        <Photos images={this.state.imageUrls} />
        {/* {this.state.showModal && (
          <Modal
            view={this.state.modalView}
            images={this.state.imageUrls}
            openModal={this.openModal}
            closeModal={this.closeModal}
          /> */}
      </div>
    );
  }
}

ReactDOM.render(<Gallery />, document.getElementById('gallery'));
