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
import Link from 'next/link';
import Swal from 'sweetalert2';
import { Height } from '@mui/icons-material';

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
  const router = useRouter();

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setUid(user.user.uid);
        getUserDisplayName(user.user.uid);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Wrong password or email`,
        });
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
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        getUserDisplayName(user.uid);
      } else {
        setUid('');
      }
    });
  }, []);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          background: '#E3D5A5',
          color: 'black',
          borderBottom: 'black solid 4px',
        }}
        position='static'
      >
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {uid ? (
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <img
                    src='/user.png'
                    style={{ width: '30px', Height: '30px' }}
                  ></img>
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontFamily: 'papyrus',
                    }}
                    href='/profile'
                  >
                    <span style={{ fontSize: '35px' }}>{display_name}</span>
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    cursor: 'default',
                    textDecoration: 'none',
                  }}
                >
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontFamily: 'papyrus',
                    }}
                    href='add_timeline'
                  >
                    <img
                      src='/image.png'
                      style={{ width: '30px', Height: '30px' }}
                    ></img>{' '}
                    <span style={{ fontSize: '35px' }}>AddTrip</span>
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    cursor: 'default',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontFamily: 'papyrus',
                    }}
                    href='/explore'
                  >
                    <img
                      src='/plane.png'
                      style={{ width: '30px', Height: '30px' }}
                    ></img>{' '}
                    <span style={{ fontSize: '35px' }}>FindTrip</span>
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    cursor: 'default',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      fontFamily: 'papyrus',
                    }}
                    href='/achievements'
                  >
                    <img
                      src='/achievement.png'
                      style={{ width: '30px', Height: '30px' }}
                    ></img>{' '}
                    <span style={{ fontSize: '35px' }}>Achievements</span>
                  </Link>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    variant='filled'
                    label='Email'
                    id='outlined-size-small'
                    size='small'
                    sx={{ input: { color: 'black' } }}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    variant='filled'
                    label='Password'
                    type='password'
                    id='outlined-size-small'
                    size='small'
                    sx={{ input: { color: 'black' } }}
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={2}
                  onClick={login}
                  style={{ cursor: 'default', textDecoration: 'none' }}
                >
                  Login
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    cursor: 'default',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Link
                    style={{
                      cursor: 'default',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    href='/signup'
                  >
                    Register
                  </Link>
                </Grid>
              </Grid>
            )}
          </Typography>
          {uid && (
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <MenuOutlinedIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
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
                <MenuItem
                  onClick={handleClose}
                  style={{
                    cursor: 'default',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Link
                    style={{
                      cursor: 'default',
                      textDecoration: 'none',
                      color: 'inherit',
                      fontFamily: 'papyrus',
                    }}
                    href='/'
                  >
                    <img
                      src='/home.png'
                      style={{ width: '30px', Height: '30px' }}
                    ></img>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  style={{
                    cursor: 'default',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Link
                    style={{
                      cursor: 'default',
                      textDecoration: 'none',
                      color: 'inherit',
                      fontFamily: 'papyrus',
                    }}
                    href='/settings'
                  >
                    <img
                      src='/settings.png'
                      style={{ width: '30px', Height: '30px' }}
                    ></img>
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={logout}
                  style={{
                    cursor: 'default',
                    textDecoration: 'none',
                    fontFamily: 'papyrus',
                  }}
                >
                  <img
                    src='/power-off.png'
                    style={{ width: '30px', Height: '30px' }}
                  ></img>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
