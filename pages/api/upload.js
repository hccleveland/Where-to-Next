const multer = require('multer');
import { updateDoc } from 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
var fbConfig = {
  apiKey: 'AIzaSyCChl_1U6qI2je2kdt4FVTvboLFcIecjgE',
  authDomain: 'where-to-next-7bc5f.firebaseapp.com',
  projectId: 'where-to-next-7bc5f',
  storageBucket: 'where-to-next-7bc5f.appspot.com',
  messagingSenderId: '873346829271',
  appId: '1:873346829271:web:0f34484e5b41e6e35ed992',
};

firebase.initializeApp(fbConfig);
const db = firebase.firestore();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  let uid = req.query.uid;
  let docid = req.query.docid;
  let fullFileName;

  const upload = multer({
    storage: multer.diskStorage({
      destination: './public/uploads',
      filename: function (req, file, cb) {
        fullFileName = uid + '-' + file.originalname;
        return cb(null, uid + '-' + file.originalname);
      },
    }),
  });

  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file' });
    }

    //store image to DB
    let myvisit = await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .doc(docid);

    await updateDoc(myvisit, {
      pictures: firebase.firestore.FieldValue.arrayUnion(fullFileName),
    });

    return res.status(200).json({ message: 'File uploaded successfully' });
  });
}
