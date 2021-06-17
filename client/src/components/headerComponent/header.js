import React, { useState, useEffect } from "react";
import './header.css'
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Token from '../../utils/utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUserCircle } from "react-icons/fa";



export default function Header() {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  //const user = <FontAwesomeIcon icon={} />;


  useEffect(() => {
    if(localStorage.getItem('token'))
    {
       var token = localStorage.getItem('token')
         var nameEmail= Token(token)
        console.log(nameEmail)
    
         var name=nameEmail.split(',')[0];
         var userId=nameEmail.split(',')[1];
          setEmail(userId)
          setName(name)
    }
    else {
      history.push('/')
    }
   
  });

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
           <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <button className="btn btn-primary" onClick={handleOnChangeHome}>Home</button>
        </li>
        <li className="nav-item">
        <button className="btn btn-primary" onClick={handleOnChangeBank}>Change Bank</button>
        </li>
        <li className="nav-item">
        <button className="btn btn-primary" onClick={handleOnChangeAbout}>About Us</button>
        </li>
        <li className="nav-item">
        <button className="btn btn-primary" onClick={handleOnChangeContact}>Contact Us</button>
        </li>
        <li className="nav-item" style={{alignContent:"right"}}>
        <select className="blueText" onChange={handleOnChangeSelect} required>
     
          <option value="" defaultValue hidden> {name} </option>

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
