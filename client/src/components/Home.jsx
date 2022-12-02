import React from "react";
import styled from "styled-components";

const HomePage = styled.div`
  color: white;
  header {
    min-height: 80px;
    background-color: rgb(15, 15, 15);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    h2 {
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    h3 {
      color: white;
      background: rgb(15, 15, 15);
      cursor: pointer;
    }
  }
  h1 {
    text-align: center;
    margin-top: 50px;
  }
  div {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
`;

export default function Home({ setIsLogin }) {
  const logoutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };
  return (
    <HomePage>
      <header>
        <h2>Home</h2>
        <h3 onClick={logoutSubmit}>Logout</h3>
      </header>
      <h1>Welcome</h1>
      <div>
        <img
          src="https://acegif.com/wp-content/uploads/2021/4fh5wi/welcome-18.gif"
          alt="welcome"
        />
      </div>
    </HomePage>
  );
}
