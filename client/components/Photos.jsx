import React from 'react';

const Photos = ({ images }) => (
  <div className="photos-container">
    <div className="img-1"><img src={images[0]} alt="" /></div>
    <div className="img-2"><img src={images[1]} alt="" /></div>
    <div className="img-3"><img src={images[2]} alt="" /></div>
    <div className="img-4"><img src={images[3]} alt="" /></div>
    <div className="img-5"><img src={images[4]} alt="" /></div>
    <div className="img-6"><img src={images[5]} alt="" /></div>
    <div className="img-7"><img src={images[6]} alt="" /></div>
  </div>
);

export default Photos;
