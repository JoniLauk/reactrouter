import React, { useState, useEffect, props } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../index.css";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bcrypt = require("bcryptjs");
  const salt = bcrypt.genSaltSync(10);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userObject = {
      username: email,
      password: bcrypt.hashSync(password, salt),
    };

    axios.post("http://localhost:3001/users", userObject).then((response) => {
      console.log(response);
    });
    setEmail("");
    setPassword("");
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
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
    </div>
  );
};

export default Login;
