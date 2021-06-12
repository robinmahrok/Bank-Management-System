import React, { useState } from "react";
import axios from "axios";
import { Spinner } from 'react-bootstrap';
import {baseUrl} from '../../baseUrl'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [load, setLoad] = useState(false);
  const handleOnChangeUserName = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const handleOnChangePassword= (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
 
  const LoginUser = async (e) => {
    e.preventDefault();
    setLoad(true);

    await axios
      .post(baseUrl+"/login", {username:username, password:password})
      .then((data) => {
        setLoad(false)
          if(data.status)
          {
        alert("Mail Sent!");
          }
          else 
          {
              alert("Wrong credentials");
          }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <header className="App-header">
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
          <label>UserName : </label>
          <input style={{borderRadius:"7px"}}
            type="text"
            placeholder="UserName"
            name="username"
            onChange={handleOnChangeUserName}
            value={username}
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
         
          <button style={{marginLeft:"20%"}} className="btn btn-success" onClick={LoginUser}>
      Login
      {load && <Spinner animation="border" variant="primary">
        </Spinner>}
         
      </button>
        </form>
        </div>
      </header>
    </div>
  );
}
