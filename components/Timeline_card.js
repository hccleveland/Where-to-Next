import React from 'react';
import { AppContext } from './Layout';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Timeline_card(props) {

  const { Uid } = React.useContext(AppContext);
  const [uid, setUid] = Uid;
  const card_country = props.time.country;
  const card_city = props.time.city;
  const card_image_url = props.time.image_url;
  const card_start_date = props.time.start_date;
  const card_end_date = props.time.end_date;

  return (
    <>
      <Grid item xs={4}>
        <Paper elevation={3} className={"timeline_card"} owner={uid} docid={props.time.docid}>
          <img src={card_image_url} className='timeline_img'/>
          <Box padding={1}>
          <Typography variant="h6" component="h2" >
          <div className="timeline_location" owner={uid} docid={props.time.docid}>
            {card_city}, {card_country}
            {props.test && <input name='input'
              className='input'
              placeholder='put your highlight'
              onKeyDown={(e) => props.send(e)}
              onChange={(e) => props.highlight(e.target.value)} owner={uid} docid={props.time.docid}></input>}
          </div>
          </Typography>
          <Typography variant="subtitle1" component="p" >
          <div className="timeline_dates" owner={uid} docid={props.time.docid}>
          Visited : {card_start_date} {card_end_date}
          </div>
          
          </Typography>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}
