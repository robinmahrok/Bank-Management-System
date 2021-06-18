// let express = require("express");
const BankInfo = require("../models/bank");
const userInfo = require("../models/userInfo");

var utils = require("../controllers/utils");
const { models } = require("mongoose");

module.exports = function (router) {
  router.post("/createAccount", (req, res) => {
    var token = req.body.token;
    var auth = utils.authenticateToken(token);
    if (auth != false) {
      var Email = auth.email.split(",")[1],
        UserId = req.body.userData.id,
        Name = auth.email.split(",")[0],
        Bank = req.body.bankDetails.bankName,
        AccountType = req.body.bankDetails.accountType;
      var AccountNumber = 0;
      BankInfo.countDocuments(
        { UserId: UserId, Bank: Bank, AccountType: AccountType },
        function (err, c) {
          if (c > 0)
            res
              .status(200)
              .send({ status: false, message: "Account Already Created." });
          else {
            BankInfo.countDocuments({}, function (err, c) {
              AccountNumber = c + 1;
              BankInfo.create(
                {
                  Name: Name,
                  UserId: UserId,
                  Email: Email,
                  Bank: Bank,
                  AccountType: AccountType,
                  AccountNumber: AccountNumber,
                },
                function (err, data) {
                  if (!err) {
                    res
                      .status(200)
                      .send({ status: true, message: data.AccountNumber });
                  } else
                    res
                      .status(200)
                      .send({
                        status: false,
                        message: "Can not Create Account",
                      });
                }
              );
            });
          }
        }
      );
    } else {
      res.status(200).send({ status: false, message: "Invalid Token" });
    }
  });

  router.post("/checkBalance", (req, res) => {
    var token = req.body.token;
    var auth = utils.authenticateToken(token);
    if (auth != false) {
      var email = auth.email.split(",")[1];
      var account = req.body.accountNo;
      BankInfo.findOne(
        { Email: email, AccountNumber: account, Status: true },
        function (err, data) {
          if (err || data==null)
            res
              .status(200)
              .send({ status: false, message: "Wrong Account Number!" });
          else {
         
            res.status(200).send({ status: true, message: data.Amount });
            
          }
        }
      );
    } else res.status(200).send({ status: false, message: "Invalid Token" });
  });

  router.post("/depositMoney", (req, res) => {
    var token = req.body.token;
    var auth = utils.authenticateToken(token);
    if (auth != false) {
      var email = auth.email.split(",")[1];
      var account = req.body.data.AccountNumber,
        bank = req.body.data.Bank,
        accountType = req.body.data.AccountType,
        amount = parseInt(req.body.data.Amount);

      BankInfo.findOne(
        {
          Email: email,
          Bank: bank,
          AccountType: accountType,
          AccountNumber: account,
          Status: true,
        },
        function (err, value) {
          if (err)
            res
              .status(200)
              .send({ status: false, message: "Wrong Account Number!" });
          else {
            if (value==null)
           { res
              .status(200)
              .send({ status: false, message: "Wrong Account Number!" });
           }
           else {
            amount = parseInt(value.Amount) + parseInt(amount);
            BankInfo.findOneAndUpdate(
              {
                AccountNumber: account,
                Bank: bank,
                AccountType: accountType,
                Email: email,
                Status: true,
              },
              { Amount: amount },
              function (err, data) {
                res.status(200).send({ status: true, message: amount });
              }
            );
           }
          }
        }
      );
    } else res.status(200).send({ status: false, message: "Invalid Token" });
  });

  router.post("/transfer", (req, res) => {
    var token = req.body.token;
    var auth = utils.authenticateToken(token);
    if (auth != false) {
      var email = auth.email.split(",")[1];
      var account = req.body.accountNo,
        bank = req.body.Bank,
        accountType = req.body.accountType,
        benBank = req.body.BenBank,
        benAccountNo = req.body.benAccountNo,
        amount = parseInt(req.body.amount);

      BankInfo.findOne(
        {
          Email: email,
          Bank: bank,
          AccountType: accountType,
          AccountNumber: account,
          Status: true,
        },
        function (err, value) {
          if (err || value==null)
            res
              .status(200)
              .send({ status: false, message: "Wrong Account Number!" });
          else {
            if (parseInt(value.Amount) > amount) {
              var myAmount = parseInt(value.Amount) - parseInt(amount);
              BankInfo.findOneAndUpdate(
                {
                  AccountNumber: account,
                  Bank: bank,
                  AccountType: accountType,
                  Email: email,
                  Status: true,
                },
                { Amount: myAmount },
                function (err, data) {
                  if (!err && data!=null) {
                    BankInfo.findOne(
                      {
                        Bank: benBank,
                        AccountNumber: benAccountNo,
                        Status: true,
                      },
                      function (err, resu) {
                        if (!err) {
                          var benAmount =
                            parseInt(resu.Amount) + parseInt(amount);
                          BankInfo.findOneAndUpdate(
                            {
                              Bank: benBank,
                              AccountNumber: benAccountNo,
                              Status: true,
                            },
                            { Amount: benAmount },
                            function (err, data) {
                              if (!err) {
                                res
                                  .status(200)
                                  .send({ status: true, message: myAmount });
                              } else {
                                res
                                  .status(200)
                                  .send({
                                    status: false,
                                    message: "Can Not Transfer",
                                  });
                              }
                            }
                          );
                        } else
                          res
                            .status(200)
                            .send({
                              status: false,
                              message: "Wrong Account Number!",
                            });
                      }
                    );
                  }
                }
              );
            } else
              res
                .status(200)
                .send({
                  status: false,
                  message: "Not Enough Money to tranfer",
                });
          }
        }
      );
    } else res.status(200).send({ status: false, message: "Invalid Token" });
  });

  router.post("/withdrawMoney", (req, res) => {
    var token = req.body.token;
    var auth = utils.authenticateToken(token);
    if (auth != false) {
      var email = auth.email.split(",")[1];
      var account = req.body.AccountNumber,
        bank = req.body.Bank,
        accountType = req.body.AccountType,
        password = req.body.password,
        amount = parseInt(req.body.Amount);
      userInfo.findOne({ Email: email }, function (err, data) {
        if (!err && data) {
          var pass = data.Password;
          utils.validatePassword(password, pass, function (err, data) {
            if (!err && data) {
              BankInfo.findOne(
                {
                  Email: email,
                  Bank: bank,
                  AccountType: accountType,
                  AccountNumber: account,
                  Status: true,
                },
                function (err, value) {
                  if (err || value==null)
                    res
                      .status(200)
                      .send({
                        status: false,
                        message: "Wrong Account Number!",
                      });
                  else {
                    if (value.Amount > amount) {
                      amount = parseInt(value.Amount) - parseInt(amount);
                      BankInfo.findOneAndUpdate(
                        {
                          AccountNumber: account,
                          Bank: bank,
                          AccountType: accountType,
                          Email: email,
                          Status: true,
                        },
                        { Amount: amount },
                        function (err, data) {
                          res
                            .status(200)
                            .send({ status: true, message: amount });
                        }
                      );
                    } else
                      res
                        .status(200)
                        .send({
                          status: false,
                          message: "Not Enough Money to Withdraw",
                        });
                  }
                }
              );
            } else {
              res.status(200).send({ staus: false, message: "Wrong Password" });
            }
          });
        }
      });
    } else res.status(200).send({ status: false, message: "Invalid Token" });
  });

  router.post("/deleteAccount", (req, res) => {
    var token = req.body.token;
    var auth = utils.authenticateToken(token);
    if (auth != false) {
      var email = auth.email.split(",")[1];
      var account = req.body.accountNo;
      BankInfo.findOneAndUpdate(
        { Email: email, AccountNumber: account, Status: true },
        { Status: false },
        function (err, data) {
          if (err || data==null)
            res
              .status(200)
              .send({ status: false, message: "Wrong Account Number!" });
          else {
            res
              .status(200)
              .send({ status: true, message: "Account Deleted Successfully!" });
          }
        }
      );
    } else res.status(200).send({ status: false, message: "Invalid Token" });
  });

  router.post("/allAccounts", (req, res) => {
    var token = req.body.token;
    var auth = utils.authenticateToken(token);
    if (auth != false) {
      var email = auth.email.split(",")[1];
      BankInfo.find(
        { Email: email, Status: true },
        { Amount: 0, Status: 0, UserId: 0, _id: 0, Email: 0, Name: 0 },
        function (err, data) {
          if (err || data.length<1)
            res
              .status(200)
              .send({ status: false, message: "No Accounts found" });
          else {
            res.status(200).send({ status: true, message: data });
          }
        }
      );
    } else res.status(200).send({ status: false, message: "Invalid Token" });
  });
};
