import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import Orders from './Orders';
import { BrowserRouter, Switch, Route} from "react-router-dom";
import { useEffect } from 'react'; 
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe ( "pk_test_51LNdY9SCqr5jNIbPwRYgMI6HTL8gl9Z6f7q6iw16yKgsU36uDiwi7H7zQqJu71OT76JmBiaFYl1yVgprFtyrAs0h00c7ILmksU");
     
function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('This user is >>', authUser);

      if ( authUser ) {
        // The user just logged in / The user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      }
      else {
        // The user is logged out
        dispatch({
         type: 'SET_USER',
         user: null
        })
      }
    })
  }, [])
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={ promise }>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
