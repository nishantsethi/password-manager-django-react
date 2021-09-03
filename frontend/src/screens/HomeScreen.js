import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import "../styles/screens/css/HomeScreen.css"

const HomeScreen = () => {
  return (
    <div>
      <main className= "main">
        <Container>
          <p className = "coming-soon-text">
          Hey There! Thanks for checking us out. Our engineers are working hard 
          to make Passbit a reality! Our beta will be out soon. Bookmark us so you don't forget!
          </p>
        </Container>
      </main>
    </div>
  );
};

export default HomeScreen;
