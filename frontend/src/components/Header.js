import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {logout} from '../actions/userActions'
import logoemp from '../assets/logoemp.png'
import '../styles/components/css/Header.css'

function Header() {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch()

    const logoutHandler= () => {
      dispatch(logout())
    }

    return (
        <header>
            <Navbar className="main-nav" variant='dark' expand="lg">
                <Container fluid>
                    <LinkContainer to="/">
                        <Navbar.Brand href="/"><img src={logoemp} className="logo" alt="PassBit" /> </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <LinkContainer to='/' exact>
                                <Nav.Link>
                                    Home
                                </Nav.Link>
                                
                            </LinkContainer>

                            {userInfo ? (
                            <LinkContainer to='/dashboard' exact> 
                                <Nav.Link>
                                    Dashboard
                                </Nav.Link>
                                
                            </LinkContainer>

                            ) : ""}
                            
                            

                        </Nav>
                        <Nav
                            className="ms-auto"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >

                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        Login
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
