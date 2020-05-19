// import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({
  databaseURL: 'https://finger-rules.firebaseio.com',
  projectId: 'finger-rules'
});