import React, { useState } from "react";
import './footer.css'
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';




export default function Footer() {
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
       
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
      <footer className="footer">
  <div className="footer-left col-md-4 col-sm-6">
    <p className="about">
      <span> About the company</span>

    </p>
    <div className="icons">
      <a href="#"><i className="fa fa-facebook"></i></a>&nbsp;&nbsp;
      <a href="#"><i className="fa fa-twitter"></i></a>&nbsp;&nbsp;
      <a href="#"><i className="fa fa-linkedin"></i></a>&nbsp;&nbsp;
      <a href="#"><i className="fa fa-google-plus"></i></a>&nbsp;&nbsp;
      <a href="#"><i className="fa fa-instagram"></i></a>
    </div>
  </div>
  <div className="footer-center col-md-4 col-sm-6">
  
  </div>
  <div className="footer-right col-md-4 col-sm-6">
  
    <p className="menu">
      <button className="secondary" style={{borderRadius:"5px"}} onClick={handleOnChangeHome}> Home</button> | &nbsp;
      <button className="secondary" style={{borderRadius:"5px"}} onClick={handleOnChangeAbout}> About Us</button> |&nbsp;
      <button className="secondary" style={{borderRadius:"5px"}} onClick={handleOnChangeContact}> Contact Us</button> 
      
    </p>
    <p className="name"> Bank Management System  &copy; 2021</p>
  </div>
</footer>
    </div>
  );
}
