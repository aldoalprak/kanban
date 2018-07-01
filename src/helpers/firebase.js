import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBR1XY_yxuLGQZAnJjvDBKGVmgtIeWF79A",
    authDomain: "kanban-208915.firebaseapp.com",
    databaseURL: "https://kanban-208915.firebaseio.com",
    projectId: "kanban-208915",
    storageBucket: "kanban-208915.appspot.com",
    messagingSenderId: "975719510898"
  };

  firebase.initializeApp(config);

  const db = firebase.database()
  const todo = db.ref('todos/')
  const wip = db.ref('wip/')
  const done = db.ref('done/')

  export  { todo, wip, done }