
const functions = require("firebase-functions");

// import express
const app = require('express')()

const FBAuth = require('./util/fbAuth')

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream
} = require('./handlers/screams')
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser
} = require('./handlers/users.js')

// Scream routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)
app.get('/scream/:screamId', getScream)
// TODO: delete scream
app.get('/scream/:screamId/like', FBAuth, likeScream)
// TODO: unlike a scream
app.get('/scream/:screamId/lunike', FBAuth, unlikeScream)
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)

// Users routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)

// export all functions for the app
exports.api = functions.https.onRequest(app)

