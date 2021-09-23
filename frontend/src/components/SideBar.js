import React, {useEffect} from "react";
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
import { listPasswords } from "../actions/passwordActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import PasswordSmall  from './PasswordSmall'


const SideBar = () => {
    const dispatch = useDispatch();

    const passwordList = useSelector((state) => state.listPassword);
    const { error, loading, passwords } = passwordList;

    const newPass = useSelector(state => state.createPassword)
    const { errorn, loadingn, userInfo } = newPass

    useEffect(() => {
        dispatch(listPasswords());
    }, [dispatch]);

    return (
        <div className="d-grid gap-2">
            <LinkContainer to="/dashboard/pass/create">
                <Button variant="primary" size="sm">
                    <i className="fas fa-plus"></i> New Password
                </Button>
            </LinkContainer>

            {loading || loadingn ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Col>
                    {passwords.map((password) => (
                        <Row key={password.id} >
                            <PasswordSmall pass={password} />
                        </Row>
                    ))}
                </Col>
            )}
        </div>
    );
};

export default SideBar;
