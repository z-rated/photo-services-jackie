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
    const {
      name, images, transitionEnter, transitionExit, closeModal,
    } = this.props;
    const { view, currSlide } = this.state;
    return (
      <div className={`modal ${transitionEnter}`} id="gallery-modal">
        {view === 'slideshow' && (
          <SlideshowModal
            name={name}
            images={images}
            currSlide={currSlide}
            transitionExit={transitionExit}
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
            transitionExit={transitionExit}
            closeModal={closeModal}
            changeView={this.changeView}
          />
        )}
      </div>
    );
  }
}

Modal.propTypes = {
  name: PropTypes.string,
  view: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  transitionEnter: PropTypes.string,
  transitionExit: PropTypes.string,
  currSlide: PropTypes.number,
  closeModal: PropTypes.func,
};

Modal.defaultProps = {
  name: 'restaurant name',
  view: 'slideshow',
  images: [],
  transitionEnter: '',
  transitionExit: '',
  currSlide: 0,
  closeModal: () => { },
};

export default Modal;
