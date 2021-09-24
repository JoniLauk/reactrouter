import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../index.css";
import axios from "axios";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const bcrypt = require("bcryptjs");
  const salt = bcrypt.genSaltSync(10);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get("http://localhost:3001/users", {
        params: {
          username: email,
        },
      })
      .then((response) => {
        console.log(response);

        if (response.data.length === 0) {
          const userObject = {
            username: email,
            password: bcrypt.hashSync(password, salt),
          };
          axios
            .post("http://localhost:3001/users", userObject)
            .then((response) => {
              console.log(response);
            });
          setEmail("");
          setPassword("");
          alert("New account created, pls login!");
          setRedirect(null);
        } else {
          response.data.map((user) => {
            console.log(user.password);
            bcrypt.compare(password, user.password, function (err, res) {
              console.log(res);
            });
          });
          console.log(require("crypto").randomBytes(256).toString("base64"));
          setRedirect("/home");
          setRedirect("/home");
        }
      });
  }

  if (redirect) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <div className="Login">
        <Router>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Login
            </Button>
          </Form>
        </Router>
      </div>
    );
  }
};

export default Login;
