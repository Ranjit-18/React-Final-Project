import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { faHome, faCarrot, faDrumstickBite, faShoppingCart, faHistory, faInfoCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import ContactUs from "./ContactUs";
import Home from "./Home";
import NonVeg from "./NonVeg";
import PurchaseHistory from "./PurchaseHistory";
import Veg from "./Veg";
import "./App.css";
import { useSelector } from "react-redux";
import GoogleLoginComponent from "./GoogleLoginComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLoginComponent from "./FacebookLoginComponent";
import '@fortawesome/fontawesome-free/css/all.min.css'


function App()
{ 
  const cart = useSelector((state) => state.cart);
  const totalItems = cart.reduce((sum,item) => sum +=item.quantity,0);
  
  return(
    <>
      <GoogleOAuthProvider clientId="631158481719-qblaqc8tbmq8oh0tg90jmrmu3i7l62mc.apps.googleusercontent.com">
      <GoogleLoginComponent />
      <FacebookLoginComponent />
      <BrowserRouter>
      <Link className="nav-link" to="/home">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link className="nav-link" to="/veg">
              <FontAwesomeIcon icon={faCarrot} /> Veg
            </Link>
            <Link className="nav-link" to="/nonveg">
              <FontAwesomeIcon icon={faDrumstickBite} /> NonVeg
            </Link>
            <Link className="nav-link" to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart ({totalItems})
            </Link>
            <Link className="nav-link" to="/purchasehistory">
              <FontAwesomeIcon icon={faHistory} /> Purchase History
            </Link>
            <Link className="nav-link" to="/aboutus">
              <FontAwesomeIcon icon={faInfoCircle} /> About Us
            </Link>
            <Link className="nav-link" to="/contactus">
              <FontAwesomeIcon icon={faEnvelope} /> Contact Us
            </Link>
        
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/veg" element={<Veg/>}/>
          <Route path="/nonveg" element={<NonVeg/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/purchasehistory" element={<PurchaseHistory/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>

        </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  )
}
export default App;