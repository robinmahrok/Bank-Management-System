import React, { useState, useEffect } from "react";
import axios from "axios";
import "./createAccount.css";
import { Modal } from "react-bootstrap";
import { baseUrl } from "../../baseUrl";
import { useHistory } from "react-router-dom";
import Header from "../headerComponent/header";
import Footer from "../footerComponent/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Token from "../../utils/utils";

export default function CreateAccount() {
  var history = useHistory();
  const [Bank, setBank] = useState("");
  const [Email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");

  const [verificationEmail, setVerificationEmail] = useState("");

  const [prompt, setPrompt] = useState(false);
  const [getDetails, setgetDetails] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [name, setName] = useState("");
  const [userData, setUserData] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;
  const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      var token = localStorage.getItem("token");
      var nameEmail = Token(token);

      var name = nameEmail.split(",")[0];
      var userId = nameEmail.split(",")[1];
      setEmail(userId);
      setName(name);
    } else {
      history.push("/");
    }
  });

  const handleOnChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleOnChangeFatherName = (e) => {
    e.preventDefault();
    setfatherName(e.target.value);
  };

  const handleOnChangeContactNumber = (e) => {
    e.preventDefault();
    setContact(e.target.value);
  };
  const handleOnChangeCountry = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
  };
  const handleOnChangeState = (e) => {
    e.preventDefault();
    setState(e.target.value);
  };
  const handleOnChangeCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };
  const handleOnChangeAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };
  const handleOnChangeZip = (e) => {
    e.preventDefault();
    setZipcode(e.target.value);
  };

  const handleOnChangeEmail = (e) => {
    e.preventDefault();
    setVerificationEmail(e.target.value);
    setgetDetails(true);
  };
  const handleOnChangeBank = (e) => {
    e.preventDefault();
    setBank(e.target.value);
  };

  const handleOnChangeNoCreateAccount = (e) => {
    setPrompt(false);
  };

  const handleOnChangeYesCreateAccount = (e) => {
    setPrompt(false);
    var bankDetails = {
      bankName: Bank,
      accountType: accountType,
    };
    axios
      .post(baseUrl + "/createAccount", {
        userData,
        bankDetails,
        token: localStorage.getItem("token"),
      })
      .then((response) => {
        setLoad(false);

        if (response.data.status) {
          alert("Your account Number is: " + response.data.message);
          history.push("/home");
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnChangeAccountType = (e) => {
    e.preventDefault();
    setAccountType(e.target.value);
  };

  const handleOnChangeCreateAccount = (e) => {
    e.preventDefault();
    if (Email == verificationEmail) {
      setgetDetails(true);
      setPrompt(true);
    } else {
      alert("Email Mismatch");
    }
  };



  const GetDetails = (e) => {
    e.preventDefault();
    setLoad(true);
    if (Email == verificationEmail) {
      console.log(localStorage.getItem("token"));
      axios
        .post(baseUrl + "/getDetails", { token: localStorage.getItem("token") })
        .then((response) => {
          setLoad(false);

          if (response.data.status) {
            setgetDetails(false);
            setUserData(response.data.message);
            setName(response.data.message.name);
            setfatherName(response.data.message.FatherName);
            setContact(response.data.message.Contact);
            setCountry(response.data.message.Country);
            setState(response.data.message.State);
            setCity(response.data.message.City);
            setAddress(response.data.message.Address);
            setZipcode(response.data.message.ZipCode);
            setShowDetails(true);
          } else {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Email Mismatch");
    }
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
            <h2>{name}</h2>
            <br></br>
            <label>Select Your Bank : </label> &nbsp;
            <select className="blue" onChange={handleOnChangeBank} required>
              <option value="" hidden defaultValue>
                [Please select any one]
              </option>
              <option value="HDFC">HDFC Bank</option>
              <option value="SBI">State Bank of India</option>
              <option value="ICICI">ICICI Bank</option>
              <option value="AXIS">AXIS Bank</option>
              <option value="BOB">Bank of Baroda</option>
            </select>
            <br />
            <br />
            <div>
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
            </div>
            <div>
              <label>Email :&nbsp;</label>
              <input
                type="text"
                style={{ borderRadius: "7px" }}
                onChange={handleOnChangeEmail}
              />

              {getDetails && (
                <div>
                  <button
                    style={{ marginLeft: "20px" }}
                    className="btn btn-info"
                    onClick={GetDetails}
                  >
                    Get Your Details
                  </button>
                </div>
              )}
            </div>
            {showDetails && (
              <div>
                <br />
                <label>Name : </label>
                <input
                  style={{ borderRadius: "7px" }}
                  type="text"
                  name="name"
                  onChange={handleOnChangeName}
                  value={name}
                  readOnly
                  required
                />{" "}
                <br />
                <br />
                <label>Father's Name : </label>
                <input
                  style={{ borderRadius: "7px" }}
                  type="text"
                  name="fName"
                  onChange={handleOnChangeFatherName}
                  value={fatherName}
                  readOnly
                  required
                />{" "}
                <br />
                <br />
                <label>Contact No. : </label>
                <input
                  style={{ borderRadius: "7px" }}
                  type="number"
                  name="contactNumber"
                  onChange={handleOnChangeContactNumber}
                  value={contact}
                  required
                  readOnly
                />{" "}
                <br />
                <br />
                <label>Country : </label>
                <input
                  style={{ borderRadius: "7px" }}
                  type="text"
                  name="country"
                  onChange={handleOnChangeCountry}
                  value={country}
                  readOnly
                  required
                />{" "}
                <br />
                <br />
                <label>State : </label>
                <input
                  style={{ borderRadius: "7px" }}
                  type="text"
                  name="state"
                  onChange={handleOnChangeState}
                  value={state}
                  readOnly
                  required
                />{" "}
                <br />
                <br />
                <label>City : </label>
                <input
                  style={{ borderRadius: "7px" }}
                  type="text"
                  name="city"
                  onChange={handleOnChangeCity}
                  value={city}
                  readOnly
                  required
                />{" "}
                <br />
                <br />
                <label>Address : </label>
                <textarea
                  style={{ borderRadius: "7px" }}
                  name="address"
                  onChange={handleOnChangeAddress}
                  value={address}
                  readOnly
                  required
                />{" "}
                <br />
                <br />
                <label>Zip Code : </label>
                <input
                  style={{ borderRadius: "7px" }}
                  type="text"
                  name="zip"
                  onChange={handleOnChangeZip}
                  value={zipcode}
                  readOnly
                  required
                />{" "}
                <br />
                <br />
                <div>
                  <button
                    style={{ marginLeft: "20px" }}
                    className="btn btn-success"
                    onClick={handleOnChangeCreateAccount}
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer></Footer>

      {prompt && (
        <Modal show={prompt} onHide={handleOnChangeYesCreateAccount}>
          <Modal.Header closeButton>
            <Modal.Title>Create account</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to create your account?</Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-secondary"
              onClick={handleOnChangeNoCreateAccount}
            >
              No
            </button>
            <button
              className="btn btn-primary"
              onClick={handleOnChangeYesCreateAccount}
            >
              Create Account
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
