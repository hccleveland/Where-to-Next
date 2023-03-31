import React from 'react';

export default function UploadedImage(props) {
  return (
    <div>
      <img
        src={
          'https://wheretonexts3bucket.s3.ap-northeast-1.amazonaws.com/' +
          props.imageUrl
        }
      ></img>
    </div>
  );
}
