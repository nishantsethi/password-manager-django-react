import React from "react";
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

const DashboardDefaultScreen = () => {
    return (
        <Row md={{ span: 5, offset: 5 }}>
            <Col md={{ span: 5, offset: 5 }}>
                <div className="center-button">
                    <LinkContainer to="/dashboard/pass/create">
                        <Button variant="primary" size="sm">
                            <i className="fas fa-plus"></i> New Password
                        </Button>
                    </LinkContainer>
                </div>
            </Col>
        </Row>
    );
};

export default DashboardDefaultScreen;
