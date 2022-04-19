import {initializeApp} from 'firebase/app'
import {getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
} from 'firebase/auth'
import{
    doc,
    getDoc,
    getFirestore,
    setDoc
} from 'firebase/firestore'

//Firebase authentication
const firebaseConfig = {
  apiKey: "AIzaSyDcDFbZE3-SBoKv18s5jcyCUl2357Szsd0",
  authDomain: "crownstore-db.firebaseapp.com",
  projectId: "crownstore-db",
  storageBucket: "crownstore-db.appspot.com",
  messagingSenderId: "152402072118",
  appId: "1:152402072118:web:c104e10322802510f37e97"
};


const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

//Firestore database

export const db = getFirestore()

export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef =  doc(db, 'users', userAuth.uid)
    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef)
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    //if user data does not exists
    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth
        const createdAt = new Date()
        
    //create/set the document with the data from userAuth in my collection
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt 
            })
        } catch (error) {
            console.log('error creating the user', error.message);
            
        }
    }
    return userDocRef

    //if user data exists
    //return userDocRef
    
}
