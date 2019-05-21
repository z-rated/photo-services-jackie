import React from 'react';
import PropTypes from 'prop-types';
import GridModal from './GridModal';
import SlideshowModal from './SlideshowModal';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: '',
      currSlide: 0,
    };

    const { images } = this.props;
    this.n = images.length - 1;

    this.changeView = this.changeView.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
  }

  componentDidMount() {
    const { view, currSlide } = this.props;
    this.setState({
      view,
      currSlide,
    });
  }

  changeView(style, index) {
    if (style === 'slideshow') {
      this.setState({
        view: 'slideshow',
        currSlide: index,
      });
    } else {
      this.setState({
        view: 'grid',
      });
    }
  }

  prevSlide() {
    const { currSlide } = this.state;
    if (currSlide === 0) {
      this.setState({
        currSlide: this.n,
      });
    } else {
      const prevSlide = currSlide - 1;
      this.setState({
        currSlide: prevSlide,
      });
    }
  }

  nextSlide() {
    const { currSlide } = this.state;
    const nextSlide = (currSlide + 1) % (this.n + 1);
    this.setState({
      currSlide: nextSlide,
    });
  }

  render() {
    const { name, images, closeModal } = this.props;
    const { view, currSlide } = this.state;
    return (
      <div className="modal" id="gallery-modal">
        {view === 'slideshow' && (
          <SlideshowModal
            name={name}
            images={images}
            currSlide={currSlide}
            closeModal={closeModal}
            changeView={this.changeView}
            prevSlide={this.prevSlide}
            nextSlide={this.nextSlide}
          />
        )}
        {view === 'grid' && (
          <GridModal
            name={name}
            images={images}
            closeModal={closeModal}
            changeView={this.changeView}
          />
        )}
      </div>
    );
  }
}

Modal.propTypes = {
  view: PropTypes.string,
  currSlide: PropTypes.number,
  name: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  closeModal: PropTypes.func,
};

Modal.defaultProps = {
  view: 'slideshow',
  currSlide: 0,
  name: 'restaurant name',
  images: [''],
  closeModal: () => { },
};

export default Modal;