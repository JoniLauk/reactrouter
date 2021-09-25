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
      .post("http://localhost:3001/users/login", {
        username: email,
        password: password,
      })
      .then((res) => {
        const myStorage = window.localStorage;
        myStorage.setItem("accesToken", res.data.accesToken);
        console.log(res.data.accesToken);
        setRedirect("/home");
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
