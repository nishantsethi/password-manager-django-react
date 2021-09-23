import React, { useState, useEffect } from "react";
import { Button, Container, Row, Form, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { listPasswordDetails } from "../actions/passwordActions";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ViewPassword = ({ match }) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordEye, setPasswordEye] = useState("fas fa-eye-slash");
    const [isCopied, setIsCopied] = useState(false);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const passwordDetails = useSelector((state) => state.passwordDetail);
    const { loading, error, password } = passwordDetails;

    const onCopyText = () => {
        setIsCopied(true);
        setMessage("Password copied to your clipboard!");
        setTimeout(() => {
            setIsCopied(false);
            setMessage("");
        }, 2000);
    };

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
        setPasswordEye(
            passwordEye == "fas fa-eye-slash"
                ? "fas fa-eye"
                : "fas fa-eye-slash"
        );
    };

    // useEffect(() => {
    //     dispatch(listPasswordDetails(match.params.id));
    // }, [dispatch, password]);

    return (
        <div>
            <Container fluid>
                {message && <Message variant="success">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Row>
                    <Col>
                        <h2>{password.name}</h2>
                    </Col>
                    <Col float="right">
                        <Row className="align-items-end">
                            <Col sm={10}></Col>
                            <Col sm={2}>
                                <LinkContainer to="/dashboard">
                                    <Button variant="primary" size="sm">
                                        <i className="fas fa-times"></i>
                                    </Button>
                                </LinkContainer>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Form>
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextEmail"
                        >
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    plaintext
                                    readOnly
                                    defaultValue={password.name}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextPassword"
                        >
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type={passwordShown ? "text" : "password"}
                                    placeholder="Password"
                                    readOnly
                                    defaultValue={password.password}
                                />
                            </Col>
                            <Col sm="1">
                                <i
                                    className={passwordEye}
                                    onClick={togglePasswordVisiblity}
                                ></i>
                            </Col>
                            <Col sm="1">
                                <Col>
                                    <CopyToClipboard
                                        text={password.password}
                                        onCopy={onCopyText}
                                    >
                                        <i className="fas fa-copy"></i>
                                    </CopyToClipboard>
                                </Col>
                            </Col>
                        </Form.Group>
                    </Form>
                </Row>
                <Row></Row>
            </Container>
        </div>
    );
};

export default ViewPassword;
