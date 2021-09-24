import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
    Navbar,
    Button,
    Nav,
    Container,
    Row,
    NavDropdown,
    NavItem,
    Col,
} from "react-bootstrap";
import SideBar from "../components/SideBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../styles/screens/css/Dashboard.css";
import CreatePass from "./CreatePass";
import ViewPassword from "./ViewPassword";
import DashboardDefaultScreen from "./DashboardDefaultScreen";

const Dashboard = ({ history, match }) => {
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
        <Router className="dashboard">
            <Row>
                <Col xs={2} md={2} className="sidebar-cust">
                    <div>
                        <SideBar />
                    </div>
                </Col>
                <Col>
                    <Container fluid>
                        <Route
                            path={`${match.url}/pass/create`}
                            component={CreatePass}
                            exact
                        />
                        <Route
                            path={`${match.url}/pass/view/:id`}
                            component={ViewPassword}
                            exact
                        />
                        <Route
                            path={`${match.url}`}
                            component={DashboardDefaultScreen}
                            exact
                        />
                        
                    </Container>
                </Col>
            </Row>
        </Router>
    );
};

export default Dashboard;
