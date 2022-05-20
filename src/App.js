import { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { onAuthStageChangedListener, createUserDocFromAuth } from './utils/firebase/firebase.utils';
import Home from './routes/home/home.component';
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from './routes/shop/shop.component';
import Checkout from './components/checkout/checkout.component';
import {setCurrentUser} from './store/user/user.action'
import './App.scss'




function App() {

  const dispatch = useDispatch()

  //this effect runs on initialization to setup the listener
  useEffect(() =>{
      const unsubscribe =  onAuthStageChangedListener((user) => {
            
            if(user){
                createUserDocFromAuth(user)
            }
            dispatch(setCurrentUser(user))
            
        })

        return unsubscribe
        
    }, [])

  

  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path="shop/*" element={<Shop/>}/>
        <Route path="auth" element={<Authentication/>}/>
        <Route path="checkout" element={<Checkout/>}/>
      </Route>
    </Routes>
  );
}

export default App;
