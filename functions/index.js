const functions = require("firebase-functions");
const admin = require('firebase-admin')

// import express
const app = require('express')()

admin.initializeApp()

// add firebase auth
var config = {
  apiKey: "AIzaSyCw8OTpnca6CKv23pgMALL4o07sLmvratQ",
  authDomain: "socialape-73512.firebaseapp.com",
  databaseURL: "https://socialape-73512-default-rtdb.firebaseio.com",
  projectId: "socialape-73512",
  storageBucket: "socialape-73512.appspot.com",
  messagingSenderId: "768571230379",
  appId: "1:768571230379:web:bae633a18e266d23b48fee"
};

// import firebase
const firebase = require('firebase')
firebase.initializeApp(config)

const db = admin.firestore()

// setup 'get screams' path
app.get('/screams', (req, res) => {
  db
    .collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {

    let screams = []

    data.forEach(doc => {
      screams.push({
        screamId: doc.id,
        body: doc.data().body,
        userHandle: doc.data().userHandle,
        createdAt: doc.data().createdAt
      })
    })
      return res.json(screams)

  })
  .catch(err => console.error(err))
})

// setup 'post screams' path
app.post('/scream', (req, res) => {

  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  }

  db
    .collection('screams')
    .add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully`})
    })
    .catch(err => {
      res.status(500).json({ error: 'smething went wrong' })
      console.error(err)
    })
})

// Signup route
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  }

  //TODO: validate data
  let token, userId

  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        // handle exists
        return res.status(400).json({ handle: 'this handle is already taken'})
      } else {
        // create the user
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      // get the user id
      userId = data.user.uid
      return data.user.getIdToken()
    })
    .then(idToken => {
      // grab the token and create the user's credentials
      token = idToken
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId: userId
      }
      // pass to a document in collection
      return db.doc(`/users/${newUser.handle}`).set(userCredentials)
    })
    .then(() => {
      // return the token
      return res.status(201).json({ token })
    })
    .catch(err => {
      // return a descriptive error
      console.error(err)
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use'})
      } else {
        return res.status(500).json({ error: err.code})
      }
    })
})

// export all functions for the app
exports.api = functions.https.onRequest(app)

