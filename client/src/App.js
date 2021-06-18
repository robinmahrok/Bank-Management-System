import "./App.css";
import Login from "../src/components/loginComponent/login";
import SignUp from "./components/signUpComponent/signup";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import forgotPassword from "./components/forgotPasswordComponent/forgotPassword";
import OtpVerify from "./components/otpVerifyComponent/otpVerify";
import Home from "./components/homeComponent/home";
import CreateAccount from "./components/createAccountComponent/createAccount";
import AllAccounts from "./components/HomeSubComponents/AllAccountsComponent/AllAccounts";
import DepositMoney from "./components/HomeSubComponents/DepositMoneyComponent/DepositMoney";
import Transfer from "./components/HomeSubComponents/TransferComponent/Transfer";
import Withdraw from "./components/HomeSubComponents/WithdrawComponent/Withdraw";
import AboutUs from "./components/headerComponent/aboutus";
import ContactUs from "./components/headerComponent/ContactUs";

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
        <Route path="/allAccounts" component={AllAccounts} />
        <Route path="/depositMoney" component={DepositMoney} />
        <Route path="/transfer" component={Transfer} />
        <Route path="/withdraw" component={Withdraw} />
        <Route path="/aboutUs" component={AboutUs} />
        <Route path="/ContactUs" component={ContactUs} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
