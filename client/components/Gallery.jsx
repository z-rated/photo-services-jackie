import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal.jsx';

class Gallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
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
    fetch('/photos', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    })
      .then((response) => {
        console.log(response.json());
        this.setState({
          imageUrls: response.json(),
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
      <div className="gallery-container">
        Photos component
        {this.state.imageUrls.map((url, index) => (
          <div className="gal-img" id={`img-${index}`}><img src={url} alt="" /></div>
        ))}
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
