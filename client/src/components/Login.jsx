import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { login, register } from "../api";

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(32, 31, 31);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h1 {
    color: white;
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgb(15, 15, 15);
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  p {
    color: white;
    text-transform: uppercase;
    span {
      color: teal;
      cursor: pointer;
    }
  }
  h3 {
    color: rgb(220, 20, 60);
    text-transform: uppercase;
  }
`;

export default function Login({ setIsLogin }) {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(register, {
        username: user.name,
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      setErr(res.data.msg);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(login, {
        email: user.email,
        password: user.password,
      });
      setUser({ name: "", email: "", password: "" });
      localStorage.setItem("tokenStore", res.data.token);
      setIsLogin(true);
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  const [display, setDisplay] = useState(false);
  const style = {
    visibility: display ? "visible" : "hidden",
    opacity: display ? 1 : 0,
  };

  return (
    <Section>
      <FormContainer>
        <h1>Login</h1>
        <form onSubmit={loginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInput}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            autoComplete="true"
            onChange={onChangeInput}
          />

          <button type="submit">Login</button>
          <p>
            Don't have an account?
            <span onClick={() => setDisplay(true)}> Create One</span>
          </p>
          <h3>{err}</h3>
        </form>
      </FormContainer>
      <FormContainer style={style}>
        <h1>Register</h1>
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            name="name"
            value={user.name}
            placeholder="Username"
            onChange={onChangeInput}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={onChangeInput}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={user.password}
            autoComplete="true"
            onChange={onChangeInput}
          />

          <button type="submit">Create User</button>
          <p>
            Already have an account?
            <span onClick={() => setDisplay(false)}> Login</span>
          </p>
          <h3>{err}</h3>
        </form>
      </FormContainer>
    </Section>
  );
}
