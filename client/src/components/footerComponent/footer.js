import React, { useState, useEffect } from "react";
import './footer.css'
import axios from "axios";
import { Spinner } from "react-bootstrap";
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
      <footer class="footer">
  <div class="footer-left col-md-4 col-sm-6">
    <p class="about">
      <span> About the company</span> Ut congue augue non tellus bibendum, in varius tellus condimentum. In scelerisque nibh tortor, sed rhoncus odio condimentum in. Sed sed est ut sapien ultrices eleifend. Integer tellus est, vehicula eu lectus tincidunt,
      ultricies feugiat leo. Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue. Nam ut nibh mollis, tristique ante sed, viverra massa.
    </p>
    <div class="icons">
      <a href="#"><i class="fa fa-facebook"></i></a>&nbsp;
      <a href="#"><i class="fa fa-twitter"></i></a>&nbsp;
      <a href="#"><i class="fa fa-linkedin"></i></a>&nbsp;
      <a href="#"><i class="fa fa-google-plus"></i></a>&nbsp;
      <a href="#"><i class="fa fa-instagram"></i></a>
    </div>
  </div>
  <div class="footer-center col-md-4 col-sm-6">
  
  </div>
  <div class="footer-right col-md-4 col-sm-6">
    <h2> Company<span> logo</span></h2>
    <p class="menu">
      <a href="#"> Home</a> |
      <a href="#"> About</a> |
      <a href="#"> Services</a> |
      <a href="#"> Portfolio</a> |
      <a href="#"> News</a> |
      <a href="#"> Contact</a>
    </p>
    <p class="name"> Company Name &copy; 2016</p>
  </div>
</footer>
    </div>
  );
}
