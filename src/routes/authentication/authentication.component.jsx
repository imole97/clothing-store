
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up.component';
import SignInForm from '../../components/sign-in-form/sign-in.component';
import './authentication.styles.scss'

const Authentication = () => {

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

    // const logGoogleUser = async () => {
    //     const response = await signInWithGooglePopup();
    //     const {user} = response
    //     const userDocRef = createUserDocFromAuth(user)
    // }

    

    return(
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default Authentication