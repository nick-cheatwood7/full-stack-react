
const functions = require("firebase-functions");

// import express
const app = require('express')()

const FBAuth = require('./util/fbAuth')

const { getAllScreams, postOneScream } = require('./handlers/screams')
const { signup, login, uploadImage } = require('./handlers/users.js')

// Scream routes
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream)

// Users routes
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image', uploadImage)

// export all functions for the app
exports.api = functions.https.onRequest(app)

