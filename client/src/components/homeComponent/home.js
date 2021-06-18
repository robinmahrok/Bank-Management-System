import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { Spinner, Modal } from "react-bootstrap";
import { baseUrl } from "../../baseUrl";
import {  useHistory } from "react-router-dom";
import Header from "../headerComponent/header";
import Footer from "../footerComponent/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Token from "../../utils/utils";

export default function Home() {
  var history = useHistory();
  const [Bank, setBank] = useState("");
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [prompt, setPrompt] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [accountNo, setaccountNo] = useState("");

  const [account, setAccount] = useState(-1);
  const [showPassword, setShowPassword] = useState(false);

  const [load, setLoad] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      var token = localStorage.getItem("token");
      var nameEmail = Token(token);
      console.log(nameEmail);

      var name = nameEmail.split(",")[0];
      var userId = nameEmail.split(",")[1];
      setEmail(userId);
      setName(name);
    } else {
      history.push("/");
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleOnChangeBank = (e) => {
    e.preventDefault();
    setBank(e.target.value);
  };
  const handleOnChangeAccount = (e) => {
    e.preventDefault();
    setaccountNo(e.target.value);
  };

  const DeleteAccount = (e) => {
    e.preventDefault();
    if (accountNo == "") {
      alert("Please enter your Account Number");
    } else {
      if (CheckAccountNumber(accountNo) == true) setPrompt(true);
      else alert("Please enter a valid account number");
    }
  };

  const handleOnChangeYesDeleteAccount = (e) => {
    // e.preventDefault();

    setPrompt(false);
    CheckAccountNumber();
    setLoad(true);

    var data = {
      bank: Bank,
      accountType: accountType,
      accountNo: accountNo,
      token: localStorage.getItem("token"),
    };

    axios
      .post(baseUrl + "/deleteAccount", data)
      .then((response) => {
        setLoad(false);
        if (response.data.status) {
          alert(response.data.message);
        } else {
          alert(response.data.message);
        }
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChangeNoDeleteAccount = (e) => {
    setPrompt(false);
  };

  const handleOnChangeAccountPresent = (e) => {
    e.preventDefault();
    if (e.target.value == "yes") setAccount(1);
    else setAccount(0);
  };

  const handleOnChangeCreateAccount = (e) => {
    // e.preventDefault();
    history.push("/createAccount");
  };

  const handleOnChangeAccountType = (e) => {
    e.preventDefault();
    setAccountType(e.target.value);
  };

  const DepositMoney = (e) => {
    e.preventDefault();
    history.push("/depositMoney");
  };

  const TransferMoney = (e) => {
    e.preventDefault();
    history.push("/transfer");
  };
  const WithdrawMoney = (e) => {
    e.preventDefault();
    history.push("/withdraw");
  };

  const CheckAccountNumber = (acc) => {
    var reg = new RegExp("^[0-9]+$");
    if (reg.test(acc)) return true;
    else return false;
  };

  const CheckBalance = (e) => {
    e.preventDefault();
    CheckAccountNumber();
    setLoad(true);

    axios
      .post(baseUrl + "/checkBalance", {
        accountNo: accountNo,
        token: localStorage.getItem("token"),
      })
      .then((response) => {
        setLoad(false);
        if (response.data.status) {
          alert("Your Account Balance is: Rs." + response.data.message);
        } else {
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
            <h2>{Name}</h2>

            <div>
              <br />
              <label>Already a customer? &nbsp;</label>
              <select
                class="blue"
                onChange={handleOnChangeAccountPresent}
                required
              >
                <option value="none" hidden selected disabled>
                  [Please select any one]
                </option>
                <option value="yes">YES</option>
                <option value="no">No</option>
              </select>
              <br />
              <br />
            </div>

            {account == 1 && (
              <div>
                <label>Select Your Bank : </label> &nbsp;
                <select class="blue" onChange={handleOnChangeBank} required>
                  <option value="" hidden selected disabled>
                    [Please select any one]
                  </option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">AXIS Bank</option>
                  <option value="bob">Bank of Baroda</option>
                </select>
                <br />
                <br />
                <label>Account Type :&nbsp;</label>
                <select
                  className="blue"
                  onChange={handleOnChangeAccountType}
                  required
                >
                  <option value="" hidden defaultValue>
                    [Please select any one]
                  </option>
                  <option value="Current">Current Account</option>
                  <option value="Savings">Savings Account</option>
                  <option value="Salaried">Salaried Account</option>
                </select>
                <br />
                <br />
                <label>Enter Your Account Number : </label>
                <input
                  type={showPassword ? "text" : "password"}
                  style={{ borderRadius: "7px" }}
                  placeholder="Account Number"
                  onChange={handleOnChangeAccount}
                  value={accountNo}
                  name="password"
                  required
                />{" "}
                <i onClick={handleClickShowPassword}>
                  {showPassword ? eyeSlash : eye}
                </i>
                <br />
                <br />
                <button
                  style={{ marginLeft: "20%" }}
                  className="btn btn-primary"
                  onClick={CheckBalance}
                >
                  Check Balance
                  {load && (
                    <Spinner animation="border" variant="primary"></Spinner>
                  )}
                </button>
                <br />
                <br />
                <button
                  style={{ marginLeft: "20%" }}
                  className="btn btn-success"
                  onClick={DepositMoney}
                >
                  Deposit Money
                </button>
                <br />
                <br />
                <button
                  style={{ marginLeft: "20%" }}
                  className="btn btn-warning"
                  onClick={TransferMoney}
                >
                  Transfer Money
                </button>
                <br />
                <br />
                <button
                  style={{ marginLeft: "20%" }}
                  className="btn btn-info"
                  onClick={WithdrawMoney}
                >
                  Withdraw Money
                </button>
                <br />
                <br />
                <button
                  style={{ marginLeft: "20%" }}
                  className="btn btn-danger"
                  onClick={DeleteAccount}
                >
                  Delete Account
                </button>
              </div>
            )}
            {account == 0 && (
              <div>
                <button
                  style={{ marginLeft: "20px" }}
                  className="btn btn-primary"
                  onClick={handleOnChangeCreateAccount}
                >
                  Create Account
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer></Footer>

      {prompt && (
        <Modal show={prompt} onHide={handleOnChangeNoDeleteAccount}>
          <Modal.Header closeButton>
            <Modal.Title>Delete account</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={handleOnChangeNoDeleteAccount}
            >
              No
            </button>
            <button
              className="btn btn-primary"
              onClick={handleOnChangeYesDeleteAccount}
            >
              Delete Account
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
