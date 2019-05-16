import React from 'react';
import GridModal from './GridModal.jsx';
import IndivModal from './IndivModal.jsx';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: '',
      images: [],
    };

    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    this.setState({
      view: this.props.view,
      images: this.props.images,
    });
  }

  changeView() {
    const newView = this.state.view === 'grid' ? 'indiv' : 'grid';
    this.setState({
      view: newView,
    });
  }

  render() {
    return (
      <div>
        Modal
        {this.state.view === 'grid' && <GridModal changeView={this.changeView} />}
        {this.state.view === 'indiv' && <IndivModal changeView={this.changeView} />}
      </div>
    );
  }
}

export default Modal;
