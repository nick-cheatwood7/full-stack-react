
const { db } = require('../util/admin')

exports.getAllScreams = (req, res) => {

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
}

exports.postOneScream = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Body must not be empty' })
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  }

  db
    .collection('screams')
    .add(newScream)
    .then(doc => {
      const resScream = newScream
      resScream.screamId = doc.id
      res.json(resScream)
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' })
      console.error(err)
    })
}

// fetch one scream
exports.getScream = (req, res) => {
  let screamData = {}
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' })
      }
      screamData = doc.data()
      screamData.screamId = doc.id
      return db
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .where('screamId', '==', req.params.screamId)
        .get()
    })
    .then(data => {
      screamData.comments = []
      data.forEach(doc => {
        screamData.comments.push(doc.data())
      })
      return res.json(screamData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err.code })
    })
}

// Post a comment to a scream
exports.commentOnScream = (req, res) => {
  // validate body
  if (req.body.body.trim() === '') return res.status(400).json({ error: 'Comment must not be empty' })

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl
  }

  // confirm scream exists
  db
    .doc(`/screams/${req.params.screamId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
      return res.status(404).json({ error: 'Scream does not exist'})
      } else {
        return db
          .collection('comments')
          .add(newComment)
      }
    })
    .then(() => {
      // doc created!
      res.json(newComment)
    })
    .catch(err => {
      // internal error
      console.error(err)
      res.status(500).json({ error: 'Something went wrong'})
    })
}

exports.likeScream = (req, res) => {
  return
}

exports.unlikeScream = (req, res) => {
  return
}