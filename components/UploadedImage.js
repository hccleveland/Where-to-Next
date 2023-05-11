import React from 'react';

export default function UploadedImage(props) {
  return (
    <div>
      <img
        src={
          //' AWS URL ' +
          props.imageUrl
        }
      ></img>
    </div>
  );
}
