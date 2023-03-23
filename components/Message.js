/*on click on the pin set props of the city and country to messages
receive the props and display the messages related to that place */

//How to display the upper part
//add a new message should be donne via button on an existing comment

import React from 'react';

export default function Message(props) {
  //console.log(props.city);
  //console.log(props.example.city);
  const user = "hello";
  console.log("props", props)
  return (
    <>
      <br></br>
      {props.message[2]}
      <br></br>
      {props.message[1]} {props.message[0]}
      <br></br>
    </>
  );
}

/*
<div className='highlight'>
        <div className='highlight-place'>
          {props.message}, {props.example.country}
          <br></br>
          {props.example.comment}
          <br></br>
          {props.example.display_name} {props.example.timestamp}
        </div>
      </div>
*/