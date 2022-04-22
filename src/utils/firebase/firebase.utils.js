import {initializeApp} from 'firebase/app'
import {getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
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

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

//Firestore database

export const db = getFirestore()

export const createUserDocFromAuth = async (userAuth, additionalInfo={}) => {
    //if we don't receive userAuth argument, don't run the fucntion
    if(!userAuth) return
    //receive document
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
                createdAt,
                ...additionalInfo 
            })
        } catch (error) {
            console.log('error creating the user', error);        
        }
    }
    //if user data exists
    //return userDocRef
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return 

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return 

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth) 

export const onAuthStageChangedListener = (callback) => onAuthStateChanged(auth, callback)