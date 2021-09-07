import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Navbar,
    Nav,
    Container,
    Row,
    NavDropdown,
    NavItem,
    Col
} from "react-bootstrap";

const Dashboard = ({ history }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            console.log("Login he");
        }
    });



    return (
        <Container fluid>
            <Row>
                <Col xs lg="2">
                    Passwords
                </Col>
                <Col>
                    <h1>This is dashboard</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
