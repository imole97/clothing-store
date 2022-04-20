import {
    auth,
    signInWithGooglePopup, 
    createUserDocFromAuth, 
    // signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils'
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up.component';


const SignIn = () => {

    // useEffect(() => { 
    //     async function fetchRedirectResult(){
    //         const response = await getRedirectResult(auth) 
    //         // auth tracks authentication state in our app and firebase instance
    
    //         if (response) {
    //             const userDocRef = createUserDocFromAuth(response.user)
    //         }
    //     }
    //     fetchRedirectResult()
    // }, [])

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const {user} = response
        const userDocRef = createUserDocFromAuth(user)
    }

    

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm/>
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default SignIn