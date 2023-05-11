import S3 from 'aws-sdk/clients/s3';
import axios from 'axios';
import firebase from 'firebase/compat/app';
import { updateDoc } from 'firebase/firestore';
import 'firebase/compat/firestore';
// Firebase + Firestore Config
var fbConfig = {
  //apiKey: 
  //authDomain:
  //projectId:
  //storageBucket:
  //messagingSenderId:
  //appId:
};

firebase.initializeApp(fbConfig);
const db = firebase.firestore();

// AWS S3 Config
const s3 = new S3({
  //region:
  //accessKeyId:
  //secretAccessKey:
  //signatureVersion:
});

export default async function aws(file, uid, docid) {
  const fullFileName = uid + '-' + file.name;

  try {
    const fileParams = {
      //Bucket: ' AWS S3 Bucket ',
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
