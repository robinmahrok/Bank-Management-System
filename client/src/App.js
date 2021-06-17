import './App.css';
import Login from '../src/components/loginComponent/login'
import SignUp from './components/signUpComponent/signup';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import forgotPassword from './components/forgotPasswordComponent/forgotPassword';
import OtpVerify from './components/otpVerifyComponent/otpVerify';
import Home from './components/homeComponent/home';
import CreateAccount from './components/createAccountComponent/createAccount';



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/forgotPassword" component={forgotPassword} />
        <Route path="/otpVerify" component={OtpVerify} />
        <Route path="/home" component={Home} />
        <Route path="/createAccount" component={CreateAccount} />



        </Switch>
    
    </BrowserRouter>
  );
}

export default App;
