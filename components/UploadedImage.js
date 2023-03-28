import React from 'react';

export default function UploadedImage(props) {
  return (
    <div>
      <img src={'http://localhost:3000/uploads/' + props.imageUrl}></img>
    </div>
  );
}
