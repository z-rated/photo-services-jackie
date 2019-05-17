import React from 'react';

const Photos = ({ images }) => {
  const firstSeven = images.slice(0, 7);

  return (
    <div className="photos-container">
      {firstSeven.map((imageUrl, index) => (
        <div className={`img-${index + 1}`}>
          <img src={imageUrl} alt="" />
        </div>
      ))}
    </div>
  );
};

export default Photos;
