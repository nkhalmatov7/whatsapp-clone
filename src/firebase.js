import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCMME0Y1an3eoHtZG5aGq_LqPjUvEN3R2s',
  authDomain: 'whatsapp-clone-c1d01.firebaseapp.com',
  projectId: 'whatsapp-clone-c1d01',
  storageBucket: 'whatsapp-clone-c1d01.appspot.com',
  messagingSenderId: '241293483901',
  appId: '1:241293483901:web:e9b24d3ef6b8f37295f614',
  measurementId: 'G-XRMBSY0NJJ',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
