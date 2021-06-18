import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AllAccounts.css";
import { Table, Spinner } from "react-bootstrap";
import { baseUrl } from "../../../baseUrl";
import {  useHistory } from "react-router-dom";
import Header from "../../headerComponent/header";
import Footer from "../../footerComponent/footer";
import Token from "../../../utils/utils";

export default function AllAccounts() {
  var history = useHistory();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");

  const [data, setData] = useState();

  const [prompt, setPrompt] = useState(-1);

  const [load, setLoad] = useState(false);

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

  const GetAccounts = (e) => {
    e.preventDefault();

    axios
      .post(baseUrl + "/allAccounts", { token: localStorage.getItem("token") })
      .then((response) => {
        setLoad(false);
        if (response.data.status) {
          setData(response.data.message);
          console.log(response.data.message);
          setPrompt(1);

          //alert("Your Account Balance is: Rs."+response.data.message);
        } else {
          setPrompt(0);
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
            {
              <button className="btn btn-primary" onClick={GetAccounts}>
                Get Accounts
                {load && (
                  <Spinner animation="border" variant="primary"></Spinner>
                )}
              </button>
            }
            <br />
            <br />
            {prompt == 1 && (
              <div>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Bank</th>
                      <th>Account Type</th>
                      <th>Account Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((listValue, index) => (
                      <tr data-index={index}>
                        <td>{listValue.Bank}</td>
                        <td>{listValue.AccountType}</td>
                        <td>{listValue.AccountNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
            {prompt == 0 && (
              <div>
                <h5>No Accounts Found</h5>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
