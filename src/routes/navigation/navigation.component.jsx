import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { ReactComponent as CrownLogo } from "../../assets/crown.svg"
import './navigation.styles.scss'
import { UserContext } from "../../context/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"
import CartIcon from "../../components/cart-icon/cart-icon.component"
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component"
import { CartContext } from "../../context/cart.context"

const Navigation = () => {
    const {currentUser} = useContext(UserContext)
    const {isCartOpen} = useContext(CartContext)
    // const signOutHandler = async () => {
    //     await signOutUser()
    //     setCurrentUser(null)

    // }
    return(
        <>
            <div className="navigation">
                <Link to='/' className="logo-container">
                    <CrownLogo className='logo'/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    {
                        currentUser? (
                            <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
                        ) : (
                        <Link className="nav-link" to='/auth'>
                            SIGN IN
                        </Link>
                        )
                    }
                <CartIcon/>
                </div>
                {isCartOpen && <CartDropdown/>}
            </div>
            <Outlet/>
        </>

    )
}

export default Navigation