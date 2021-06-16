import React, { useState } from "react";
import axios from "axios";
import { Spinner } from 'react-bootstrap';
import {baseUrl} from '../../baseUrl'
import {Link, useHistory} from 'react-router-dom';
import Header from '../headerComponent/header'
import Footer from '../footerComponent/footer'


export default function Login() {
  var history=useHistory();
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [load, setLoad] = useState(false);
  const handleOnChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handleOnChangePassword= (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };


 
  const LoginUser = async (e) => {
    e.preventDefault();
    setLoad(true);

    await axios
      .post(baseUrl+"/login", {email:Email, password:password})
      .then((response) => {
        setLoad(false)
          if(response.data.status)
          {
        alert("Accepted!");
          }
          else if(response.data.message=="Otp not verified.")
          {
              alert("Email not Verified. Verify your email first!");
              sessionStorage.setItem('email',Email);
              history.push('/otpVerify');
          }
          else {
            alert(response.data.message);
          }
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <Header></Header>
      <div className="App-header">
       
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <div>
        <form>
         <h2>Bank Management System</h2>
          <br></br>
          <label>Email : </label>
          <input style={{borderRadius:"7px"}}
            type="text"
            placeholder="Email"
            name="Email"
            onChange={handleOnChangeEmail}
            value={Email}
            required
          />{" "}
          <br />
          <br />
          <label>Password : </label>
          <input
            type="password"
            style={{borderRadius:"7px"}}
            placeholder="Password"
            onChange={handleOnChangePassword}
            value={password}
            name="password"
            required
          />{" "}
          <br />
         <br/>
          <button style={{marginLeft:"20%"}} className="btn btn-success" onClick={LoginUser}>
      Login
      {load && <Spinner animation="border" variant="primary">
        </Spinner>}
         
      </button>
        </form>
        <br/>
        <Link to="/forgotPassword">
        <button style={{marginLeft:"20px"}} className="btn btn-primary">Forgot Password</button>
      </Link>
      <br/>
        <br/>
        <p>Not registered yet?
        <Link to="/signUp">
        <button style={{marginLeft:"20px"}} className="btn btn-primary">SignUp</button>
      </Link>
      </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
 
  );
}
