import './App.css';
import Login from '../src/components/loginComponent/login'
import SignUp from './components/signUpComponent/signup';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import forgotPassword from './components/forgotPasswordComponent/forgotPassword';
import OtpVerify from './components/otpVerifyComponent/otpVerify';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/forgotPassword" component={forgotPassword} />
        <Route path="/otpVerify" component={OtpVerify} />


        </Switch>
    
    </BrowserRouter>
  );
}

export default App;
