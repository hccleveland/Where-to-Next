import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';

export default function Ranking(props) {
  const router = useRouter();

  const clickHandler = () => {
    router.push(`/friend/${props.index.id}`);
  };

  return (
    <div onClick={clickHandler}>
      <br />
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        style={{
          backgroundColor: '#545F72',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
      >
        <Grid
          container
          item
          xs={2}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {' '}
          {props.myKey + 1}
        </Grid>
        <Grid
          container
          item
          xs={8}
          style={{
            display: 'flex',
            alignItems: 'left',
            border: 'none',
            paddingLeft: '10px',
            paddingRight: '10px',
            color: props.myKey < 3 ? '#E3D5A5' : 'white',
          }}
        >
          {props.index.name}
        </Grid>
        <Grid
          container
          item
          xs={2}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: 'none',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {props.index.point}
        </Grid>
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
