import {signInWithGooglePopup, createUserDocFromAuth} from '../../utils/firebase/firebase.utils'



const SignIn = () => {

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const {user} = response
        console.log(response);
        createUserDocFromAuth(user)
    }

    return(
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    )
}

export default SignIn