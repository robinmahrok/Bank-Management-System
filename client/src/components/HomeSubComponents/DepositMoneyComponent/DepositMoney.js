import React, { useState,useEffect } from "react";
import axios from "axios";
import './DepositMoney.css';
import { Spinner,Modal } from 'react-bootstrap';
import {baseUrl} from '../../../baseUrl'
import {Link, useHistory} from 'react-router-dom';
import Header from '../../headerComponent/header'
import Footer from '../../footerComponent/footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Token from '../../../utils/utils';

export default function DepositMoney() {
  var history=useHistory();
  const [Bank, setBank] = useState("");
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [prompt, setPrompt] = useState(false);
  const [accountType, setAccountType] = useState("");

  const [accountNo, setaccountNo] = useState("");

  const [amount, setAmount] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const [load, setLoad] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;


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


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleOnChangeBank = (e) => {
    e.preventDefault();
    setBank(e.target.value);
  };
  const handleOnChangeAccount= (e) => {
    e.preventDefault();
   
    setaccountNo(e.target.value);
  };

  const handleOnChangeDepositMoney= (e) => {
    e.preventDefault();
if(accountNo=="")
{
  alert("Please enter your Account Number");
}
else{
if(CheckAccountNumber()==true)
{ if(amount>0)
  setPrompt(true);
  else 
alert("Please enter a valid amount!")

}
else
alert("Please enter a valid account number")

}
   
  };

  const handleOnChangeYesDepositMoney= (e) => {
e.preventDefault();
   setPrompt(false)
  
    setLoad(true);
   var data={
    AccountNumber:accountNo,
    Amount:amount,
    Bank:Bank,
    AccountType:accountType
   }
   axios.post(baseUrl+"/depositMoney", {data,token:localStorage.getItem("token")})
      .then((response) => {
        setLoad(false)
          if(response.data.status)
          {
        alert("Your new Account Balance is: Rs."+response.data.message);
          }
          else {
            alert(response.data.message);
          }
      })
      .catch((err) => {
        alert(err);
      });
    // }
    // else alert("Enter a valid Account Number!")
   
  };
  const handleOnChangeNoDepositMoney= (e) => {
e.preventDefault();
    setPrompt(false)
    
   };

 

  const handleOnChangeAmount= (e) => {
    e.preventDefault();
    setAmount(e.target.value);
   
  };

  const handleOnChangeAccountType= (e) => {
    e.preventDefault();
    setAccountType(e.target.value);
   
  };



  const CheckAccountNumber= () => {
    var reg = new RegExp('^[0-9]+$');
    if(reg.test(accountNo))
    return true;
    else 
    return false;
   
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
         <h2>{Name}</h2>
    
          <div>
            
          <label>Select Your Bank : </label> &nbsp;
          <select class="blue" onChange={handleOnChangeBank} required>
     
     <option value="" hidden selected disabled>[Please select any one]</option>
     <option value="HDFC">HDFC Bank</option>
     <option value="SBI">State Bank of India</option>
     <option value="ICICI">ICICI Bank</option>
     <option value="AXIS">AXIS Bank</option>
     <option value="BOB">Bank of Baroda</option>

</select>
          <br />
          <br />
          <label>Account Type :&nbsp;</label>
    <select className="blue" onChange={handleOnChangeAccountType} required>
     <option value="" hidden defaultValue >[Please select any one]</option>
     <option value="Current">Current Account</option>
     <option value="Savings">Savings Account</option>
     <option value="Salaried">Salaried Account</option>
     </select>
     <br/>
     <br/>

          <label>Enter Your Account Number : </label>
          <input
            type={showPassword ? "text" : "password"}
            style={{borderRadius:"7px"}}
            placeholder="Account Number"
            onChange={handleOnChangeAccount}
            value={accountNo}
            name="password"
            required
          />{" "}  <i onClick={handleClickShowPassword}>
          {showPassword ? eyeSlash : eye}
        </i>
          <br />
         <br/>
         <label>Enter Amount : </label>
         <input type="number"  style={{borderRadius:"7px"}}
            placeholder="Amount"
            onChange={handleOnChangeAmount}
            value={amount}
            name="amount"
            required
          />{" "} 
         <br />
         <br/>
          
<button style={{marginLeft:"20%"}} className="btn btn-secondary" onClick={handleOnChangeDepositMoney}>
      Deposit Money
      </button>
     
     
    </div>
      </form>
        </div>
      </div>
      <Footer></Footer>

 {prompt &&
      <Modal show={prompt} onHide={handleOnChangeNoDepositMoney}>
        <Modal.Header closeButton>
          <Modal.Title>Deposit Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to deposit Rs.{amount} in your account?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleOnChangeNoDepositMoney}>
            No
          </button>
          <button className="btn btn-primary" onClick={handleOnChangeYesDepositMoney}>
            Deposit
          </button>
        </Modal.Footer>
      </Modal>
}
 </div>
  );
}
