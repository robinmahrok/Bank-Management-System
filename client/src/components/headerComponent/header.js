import React, { useState, useEffect } from "react";
import './header.css'
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Token from '../../utils/utils';




export default function Header() {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [home,setHome]=useState(false)
  const [profile,setProfile]=useState(false)
  const [contact,setContact]=useState(false)
  const [about,setAbout]=useState(false)

  //const user = <FontAwesomeIcon icon={} />;


  useEffect(() => {
    if(localStorage.getItem('token'))
    {
       var token = localStorage.getItem('token')
         var nameEmail= Token(token)
    
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
    setAbout(false);
    setHome(false)
    setContact(true)
    setProfile(false)
    history.push('/ContactUs');

  };
  const handleOnChangeAccounts = (e) => {
    e.preventDefault();
    setAbout(false);
    setHome(false)
    setContact(false)
    setProfile(true)
    history.push('/allAccounts');


  };

  const handleOnChangeAbout = (e) => {
    e.preventDefault();
    setAbout(true);
    setHome(false)
    setContact(false)
    setProfile(false)
    history.push('/aboutUs');
  };


  const handleOnChangeSelect = (e) => {
    e.preventDefault();

  if(e.target.value=="Logout")
{
  localStorage.removeItem("token");
  history.push("/")
    // axios
    //   .post(baseUrl + "/logout", { email: email })
    //   .then((response) => {
    //     if (response.data.status) {
       
    //     } else {
    //       alert(response.data.message);
    //     }
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    }
   
  };

  const handleOnChangeHome = (e) => {
     e.preventDefault();
    
     setAbout(false);
    setHome(true)
    setContact(false)
    setProfile(false)
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
          <button className="btn btn-primary" autoFocus={home}  onClick={handleOnChangeHome}>Home</button>
        </li>
        <li className="nav-item">
        <button className="btn btn-primary" autoFocus={profile} onClick={handleOnChangeAccounts}>My Accounts</button>
        </li>
        <li className="nav-item">
        <button className="btn btn-primary" autoFocus={about} onClick={handleOnChangeAbout}>About Us</button>
        </li>
        <li className="nav-item">
        <button className="btn btn-primary" autoFocus={contact} onClick={handleOnChangeContact}>Contact Us</button>
        </li>
        <li className="nav-item" style={{alignContent:"right"}}>
        <select className="blueText" onChange={handleOnChangeSelect} required>
     
          <option value="" defaultValue hidden> {name} </option>
          <option value="Logout">Log Out</option>
     
    </select>
        </li>
      </ul>
    </nav>
        </div>
    </div>
  );
}
