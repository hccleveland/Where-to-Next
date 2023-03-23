import React from 'react';

export default function Ranking(props) {
  //console.log(props.city);
  //console.log(props.example.city);
  const user = "hello";
  console.log("Ranking_props", props)
  return (
    <>
    <ol>
        <li>{props.index[1][0][0]}: {props.index[2][0][0]} </li>
        <li>{props.index[1][0][1]}: {props.index[2][0][1]} </li>
        <li>{props.index[1][0][2]}: {props.index[2][0][2]} </li>
        <li>{props.index[1][0][3]}: {props.index[2][0][3]} </li>
        <li>{props.index[1][0][4]}: {props.index[2][0][4]} </li>
        <li>{props.index[1][0][5]}: {props.index[2][0][5]} </li>
        <li>{props.index[1][0][6]}: {props.index[2][0][6]} </li>
        <li>{props.index[1][0][7]}: {props.index[2][0][7]} </li>
        <li>{props.index[1][0][8]}: {props.index[2][0][8]} </li>
        <li>{props.index[1][0][9]}: {props.index[2][0][9]} </li>

    </ol>
      
    </>
  );
}


/*
<br></br>
      {props.message[2]}
      <br></br>
      {props.message[1]} {props.message[0]}
      <br></br>

*/