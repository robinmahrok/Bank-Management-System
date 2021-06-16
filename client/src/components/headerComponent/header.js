import React, { useState, useEffect } from "react";
import './header.css'
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { baseUrl } from "../../baseUrl";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  let history = useHistory();

  const [email, setEmail] = useState("robinsinghmahrok@gmail.com");
  const user = <FontAwesomeIcon icon={faUser} />;

//   useEffect(() => {
//  setEmail()
   
//   });

  const handleOnChangeContact = (e) => {
    e.preventDefault();
    history.push('/contact');

  };
  const handleOnChangeBank = (e) => {
    e.preventDefault();
    history.push('/changeBank');

  };

  const handleOnChangeAbout = (e) => {
    e.preventDefault();
    history.push('/about');
  };

  const handleOnChangeSelect = (e) => {
    e.preventDefault();

  if(e.target.value=="logout")
{
    axios
      .post(baseUrl + "/logout", { email: email })
      .then((response) => {
        if (response.data.status) {
        
        } else {
          alert(response.data.message);
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else if( e.target.value=="settings")
    {
      history.push('/settings');
    }
  };

  const handleOnChangeHome = (e) => {
     e.preventDefault();
    history.push("/home");
   
  };


  return (
    <div className="App">
      
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <div >
           <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <button className="btn btn-primary" onClick={handleOnChangeHome}>Home</button>
        </li>
        <li class="nav-item">
        <button className="btn btn-primary" onClick={handleOnChangeBank}>Change Bank</button>
        </li>
        <li class="nav-item">
        <button className="btn btn-primary" onClick={handleOnChangeAbout}>About Us</button>
        </li>
        <li class="nav-item">
        <button className="btn btn-primary" onClick={handleOnChangeContact}>Contact Us</button>
        </li>
        <li class="nav-item" style={{alignContent:"right"}}>
        <select class="blueText" onChange={handleOnChangeSelect}>
     
          <option value="email" selected disabled>{email}</option>
          <option value="settings">Settings</option>
          <option value="Logout">Log Out</option>
     
    </select>
        </li>
      </ul>
    </nav>
        </div>
    </div>
  );
}
