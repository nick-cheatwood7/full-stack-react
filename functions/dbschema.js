let db = {
  users: [
    {
      userId: 'dh23ggj5h32g543j5gf43',
      email: 'user@email.com',
      handle: 'user',
      createdAt: '2019-03-15T10:59:52.798Z',
      imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
      bio: 'Hello, my name is user, nice to meet you',
      website: 'https://user.com',
      location: 'London, UK'
    }
  ],
  screams: [
    {
      userHandle: 'user',
      body: 'this is the scream body',
      createdAt: '2020-02-23T11:46:01.018Z',
      likeCount: 5,
      commentCount: 2
    }
  ],
  comments: [
    {
      userHandle: 'user',
      screamId: 'dh23ggj5h32g543j5gf43',
      body: 'nice one mate!',
      createdAt: '2020-02-23T11:46:01.018Z',
    }
  ]
}
const userDetails = {
  // Redux data
  credentials: {
    userId: 'dh23ggj5h32g543j5gf43',
    email: 'user@email.com',
    handle: 'user',
    createdAt: '2019-03-15T10:59:52.798Z',
    imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
    bio: 'Hello, my name is user, nice to meet you',
    website: 'https://user.com',
    location: 'London, UK'
  },
  likes: [
    {
      userHandle: 'user',
      screamId: 'dh23ggj5h32g543j5gf43'
    },
    {
      userHandle: 'john',
      screamId: 'dh23ggj5h32g543j5g345'
    }
  ]
}