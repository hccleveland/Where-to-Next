import S3 from 'aws-sdk/clients/s3';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import { updateDoc } from 'firebase/firestore';
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

const s3 = new S3({
  region: 'ap-northeast-1',
  accessKeyId: 'AKIA3BKYZCKX3QUOCDW5',
  secretAccessKey: '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',
  signatureVersion: 'v4',
});

export default async function aws(file, uid, docid) {
  const fullFileName = uid + '-' + file.name;

  try {
    const fileParams = {
      Bucket: 'wheretonexts3bucket',
      Key: fullFileName,
      Expires: 600,
      ContentType: file.type,
    };

    const url = await s3.getSignedUrlPromise('putObject', fileParams);

    await axios.put(url, file, {
      headers: {
        'Content-type': String(file.type),
      },
    });

    //store image to DB
    let myvisit = await db
      .collection('users')
      .doc(uid)
      .collection('places_visited')
      .doc(docid);

    await updateDoc(myvisit, {
      pictures: firebase.firestore.FieldValue.arrayUnion(fullFileName),
    });

    return `${fullFileName} uploaded!`;
  } catch (err) {
    return err;
  }
}
