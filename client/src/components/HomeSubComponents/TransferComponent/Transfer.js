import React, { useState,useEffect } from "react";
import axios from "axios";
import './Transfer.css';
import { Spinner,Modal } from 'react-bootstrap';
import {baseUrl} from '../../../baseUrl'
import { useHistory} from 'react-router-dom';
import Header from '../../headerComponent/header'
import Footer from '../../footerComponent/footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Token from '../../../utils/utils';

export default function Transfer() {
  var history=useHistory();
  const [Bank, setBank] = useState("");
  const [BenBank, setBenBank] = useState("");
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [prompt, setPrompt] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [accountNo, setaccountNo] = useState("");
  const [benAccountNo, setBenAccountNo] = useState("");
  const [amount, setAmount] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordBen, setShowPasswordBen] = useState(false);


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
  const handleClickShowPasswordBen = () => {
    setShowPasswordBen(!showPasswordBen);
  };

  const handleOnChangeBank = (e) => {
    e.preventDefault();
    setBank(e.target.value);
  };

  const handleOnChangeBeneficiaryBank = (e) => {
    e.preventDefault();
    setBenBank(e.target.value);
  };

  const handleOnChangeAccount= (e) => {
    e.preventDefault();
   
    setaccountNo(e.target.value);
  };

  const handleOnChangeBeneficiaryAccount= (e) => {
    e.preventDefault();
   
    setBenAccountNo(e.target.value);
  };

  const TransferMoney= (e) => {
    e.preventDefault();
if(accountNo=="" || benAccountNo=="")
{
  alert("Please enter your Account Number");
}
else{
if(CheckAccountNumber(accountNo)==true && CheckAccountNumber(benAccountNo)==true)
  setPrompt(true);
else
alert("Please enter a valid account number")

}
   
  };

  const handleOnChangeNoTransfer= (e) => {

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


  const CheckAccountNumber= (acc) => {
    var reg = new RegExp('^[0-9]+$');
    if(reg.test(acc))
    return true;
    else 
    return false;
   
  };

  
  const handleOnChangeYesTransfer =  (e) => {
   e.preventDefault();
   setPrompt(false)
    setLoad(true);
   
   var data={
        Bank:Bank,
        BenBank:BenBank,
        accountNo:accountNo,
        benAccountNo:benAccountNo,
        accountType:accountType,
        amount:amount,
        token:localStorage.getItem("token")
    }

   axios
      .post(baseUrl+"/transfer", data)
      .then((response) => {
        setLoad(false)
          if(response.data.status)
          {
        alert("Amount is tranferred and Your Account Balance is: Rs."+response.data.message);
        history.push('/home')
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
         <h2>Transfer Money</h2>
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

   
         <label>Select Beneficiary's Bank : </label> &nbsp;
          <select class="blue" onChange={handleOnChangeBeneficiaryBank} required>
     
     <option value="" hidden selected disabled>[Please select any one]</option>
     <option value="HDFC">HDFC Bank</option>
     <option value="SBI">State Bank of India</option>
     <option value="ICICI">ICICI Bank</option>
     <option value="AXIS">AXIS Bank</option>
     <option value="BOB">Bank of Baroda</option>

</select>
<br/>
<br/>

<label>Enter Beneficiary's Account Number : </label>
          <input
            type={showPasswordBen ? "text" : "password"}
            style={{borderRadius:"7px"}}
            placeholder="Account Number"
            onChange={handleOnChangeBeneficiaryAccount}
            value={benAccountNo}
            name="password"
            required
          />{" "}  <i onClick={handleClickShowPasswordBen}>
          {showPasswordBen ? eyeSlash : eye}
        </i>
          <br />
         <br/>
         <label>Enter Amount to be Transferred: </label>
         <input type="number"  style={{borderRadius:"7px"}}
            placeholder="Amount"
            onChange={handleOnChangeAmount}
            value={amount}
            name="amount"
            required
          />{" "} 
         <br />
         <br/>

          <button style={{marginLeft:"20%"}} className="btn btn-primary" onClick={TransferMoney}>
      Transfer Amount
      {load && <Spinner animation="border" variant="primary">
        </Spinner>}
      </button>

    </div>
    
    
      </form>
        </div>
      </div>
      <Footer></Footer>

 {prompt &&
      <Modal show={prompt} onHide={handleOnChangeNoTransfer}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Transfer Rs.{amount} to Account Number {benAccountNo}?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleOnChangeNoTransfer}>
            No
          </button>
          <button className="btn btn-primary" onClick={handleOnChangeYesTransfer}>
            Transfer Amount
          </button>
        </Modal.Footer>
      </Modal>
}
 </div>
  );
}
