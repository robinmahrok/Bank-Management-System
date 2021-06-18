import React, { useState,useEffect } from "react";
import axios from "axios";
import './header.css';
import { Spinner,Modal } from 'react-bootstrap';
import {baseUrl} from '../../baseUrl'
import {Link, useHistory} from 'react-router-dom';
import Header from './header'
import Footer from '../footerComponent/footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Token from '../../utils/utils';

export default function AboutUs() {
  var history=useHistory();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");


  useEffect(() => {
 

    if(localStorage.getItem('token'))
    { var token = localStorage.getItem('token')
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
        <h3> Bank Management System </h3>
        <p>
            We are living in a new era of digital world. And we want our customers to have a safe and fast banking experience.
        </p>
        <p>
            We work day and night to achieve our goal. And we are 24x7 ready to assist you. You can contact us anytime.
        </p>
       
        </div>

      </div>
      <Footer></Footer>
 </div>
  );
}
