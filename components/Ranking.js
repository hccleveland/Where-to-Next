import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';

export default function Ranking(props) {
  const router = useRouter();

  const clickHandler = () => {
    router.push(`/friend/${props.index.id}`);
  };

  let rankimage = `rank${props.myKey + 1}.png`

  return (
    <div onClick={clickHandler}>
      <br />
      <Grid container spacing={2} justify='center' alignItems='center'>
        <Grid container item xs={3}><img src={rankimage} className='rankimage'></img></Grid>
        <Grid container item xs={6}>{props.index.name}</Grid>
        <Grid container item xs={3} >{props.index.point}</Grid>
      </Grid>
       
    </div>
  );
}



 /*pathname: `/friend/${props.index.name}`,
      query: {
        id: props.index.id,
        points: props.index.points
      }
    });*/