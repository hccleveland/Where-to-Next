import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { AppContext } from './Layout';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebase from 'firebase/compat/app';

var config = {
  apiKey: 'AIzaSyCChl_1U6qI2je2kdt4FVTvboLFcIecjgE',
  authDomain: 'where-to-next-7bc5f.firebaseapp.com',
  projectId: 'where-to-next-7bc5f',
  storageBucket: 'where-to-next-7bc5f.appspot.com',
  messagingSenderId: '873346829271',
  appId: '1:873346829271:web:0f34484e5b41e6e35ed992',
};

firebase.initializeApp(config);
const db = firebase.firestore();
const auth = getAuth();

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { Uid, Display_name } = React.useContext(AppContext);
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [display_name, setDisplay_name] = Display_name;
  const [uid, setUid] = Uid;
  const router= useRouter();

  function login() {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      setUid(user.user.uid);
      getUserDisplayName(user.user.uid);
    });
  }

  async function getUserDisplayName(uid) {
    
    let data = await db.collection('users').where('__name__', '==', uid).get();
    let docs = data.docs;
  
    setDisplay_name(docs[0].data().display_name);
    setUid(uid);
  }

  function logout() {
    signOut(auth);
    setEmail('');
    setPassword('');
    setDisplay_name('');
    setUid('');
    router.push('/');
    
  }
  useEffect(()=>{
    auth.onAuthStateChanged(user => {
      if (user) {
        setUid(user.uid);
        getUserDisplayName(user.uid);
      } else {
        setUid('');
      }
    })
  },[uid]);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>

          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {uid ? <Grid container spacing={2}><Grid item xs={2}>{display_name}</Grid><Grid item xs={2}>AddTrip</Grid><Grid item xs={2}>FindTrip</Grid><Grid item xs={2}>Achievements</Grid><Grid item xs={2} onClick={logout}>Logout</Grid></Grid>:<Grid container spacing={2}>
        <Grid item xs={2}><TextField
                 label="Email"
                 id="outlined-size-small"
                 size="small"
        onChange={(event) => {setEmail(event.target.value);}}/></Grid>
        <Grid item xs={2}><TextField
                 label="Password"
                 id="outlined-size-small"
                 size="small"
        onChange={(event) => {setPassword(event.target.value);}}/></Grid>
         <Grid item xs={2}>Login</Grid>
        <Grid item xs={2}>Register</Grid></Grid>}
          </Typography>
          {uid && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
               <MenuOutlinedIcon/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Home</MenuItem>
                <MenuItem onClick={handleClose}>Ranking</MenuItem>
                <MenuItem onClick={handleClose}>Setting</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}