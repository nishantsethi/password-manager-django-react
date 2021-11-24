import React, { useState, useEffect } from "react";
import { Button, Container, Row, Form, Col, Modal } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import {
    listPasswordDetails,
    listPasswords,
    updatePassword,
    deletePassword,
} from "../actions/passwordActions";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ViewPassword = ({ match }) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordEye, setPasswordEye] = useState("fas fa-eye-slash");
    const [isCopied, setIsCopied] = useState(false);
    const [message, setMessage] = useState("");
    const [delShow, setdelShow] = useState(false);

    const [onEditMode, setEditMode] = useState(false);

    const dispatch = useDispatch();

    const passwordDetails = useSelector((state) => state.passwordDetail);
    const { loading, error, password } = passwordDetails;

    const [name, setName] = useState(password.name);
    const [appPassword, setPassword] = useState(password.password);
    const [passUrl, SetPassUrl] = useState(password.url);
    const [description, SetDescription] = useState(password.description);
    const [note, SetNote] = useState(password.note);

    const passUpdate = useSelector((state) => state.passwordUpdate);
    const { loading1, error1, newpassword } = passUpdate;

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

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(
            updatePassword(
                password.id,
                name,
                passUrl,
                appPassword,
                description,
                note
            )
        );
        setEditMode(false);
        setMessage("Password Updated Successfully!");
        setTimeout(() => {
            setMessage("");
        }, 2000);
        dispatch(listPasswords());
    };

    const handleClose = () => setdelShow(false);  // For Delete, trash icon Modal
    const handleShow = () => setdelShow(true);    // For Delete, trash icon Modal

    const handleDelete = () => {
        dispatch(deletePassword(password.id));
        setMessage("Password has been Deleted");
        setTimeout(() => {
            setMessage("");
        }, 2000);
        dispatch(listPasswords());
    };

    const toggleEditMode = () => {
        setEditMode(onEditMode ? false : true);
    };

    useEffect(() => {
        dispatch(listPasswordDetails(match.params.id));
    }, [dispatch]);

    return (
        <div>
            <Container fluid>
                {message && <Message variant="success">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                {error1 && <Message variant="danger">{error1}</Message>}
                {loading1 && <Loader />}
                <Row>
                    <Col>
                        <h2>{password.name}</h2>
                    </Col>
                    <Col float="right">
                        <Row className="align-items-end">
                            <Col sm={8}></Col>
                            <Col sm={1}>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={handleShow}
                                >
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </Col>
                            <Col sm={1}>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={toggleEditMode}
                                >
                                    <i className="fas fa-edit"></i>
                                </Button>
                            </Col>
                            <Col sm={2}>
                                <LinkContainer to="/dashboard">
                                    <Button variant="primary" size="sm">
                                        <i className="fas fa-times"></i>
                                    </Button>
                                </LinkContainer>
                            </Col>
                        </Row>
                        <Modal show={delShow} onHide={handleClose}>
                            <Modal.Header>
                                <Modal.Title>
                                    Delete {password.name}?
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure you want to delete password for{" "}
                                {password.name}?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                                <LinkContainer to="/dashboard">
                                    <Button
                                        variant="primary"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                </LinkContainer>
                            </Modal.Footer>
                        </Modal>
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
                                {onEditMode ? (
                                    <Form.Control
                                        plaintext
                                        defaultValue={() => password.name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                ) : (
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={password.name}
                                    />
                                )}
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
                                {onEditMode ? (
                                    <Form.Control
                                        type={
                                            passwordShown ? "text" : "password"
                                        }
                                        placeholder="Password"
                                        defaultValue={password.password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                ) : (
                                    <Form.Control
                                        type={
                                            passwordShown ? "text" : "password"
                                        }
                                        placeholder="Password"
                                        readOnly
                                        defaultValue={password.password}
                                    />
                                )}
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
                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextEmail"
                        >
                            <Form.Label column sm="2">
                                URL
                            </Form.Label>
                            <Col sm="10">
                                {onEditMode ? (
                                    <Form.Control
                                        plaintext
                                        defaultValue={password.url}
                                        onChange={(e) =>
                                            SetPassUrl(e.target.value)
                                        }
                                    />
                                ) : (
                                    <Form.Control
                                        plaintext
                                        readOnly
                                        defaultValue={password.url}
                                    />
                                )}
                            </Col>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextEmail"
                            >
                                <Form.Label column sm="2">
                                    Description
                                </Form.Label>
                                <Col sm="10">
                                    {onEditMode ? (
                                        <Form.Control
                                            plaintext
                                            defaultValue={password.description}
                                            onChange={(e) =>
                                                SetDescription(e.target.value)
                                            }
                                            as="textarea" 
                                            rows={3}
                                        />
                                    ) : (
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={password.description}
                                            as="textarea" 
                                            rows={3}
                                        />
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="formPlaintextEmail"
                            >
                                <Form.Label column sm="2">
                                    Note
                                </Form.Label>
                                <Col sm="10">
                                    {onEditMode ? (
                                        <Form.Control
                                            plaintext
                                            defaultValue={password.note}
                                            onChange={(e) =>
                                                SetNote(e.target.value)
                                            }
                                            as="textarea" 
                                            rows={3}
                                        />
                                    ) : (
                                        <Form.Control
                                            plaintext
                                            readOnly
                                            defaultValue={password.note}
                                            as="textarea" 
                                            rows={3}
                                        />
                                    )}
                                </Col>
                            </Form.Group>
                            {onEditMode ? (
                                <Col sm="12">
                                    <Form.Group
                                        as={Row}
                                        className="mb-3"
                                        controlId="formPlaintextEmail"
                                    >
                                        <Button onClick={updateHandler}>
                                            Update Password
                                        </Button>
                                    </Form.Group>
                                </Col>
                            ) : (
                                ""
                            )}
                        </Form.Group>
                    </Form>
                </Row>
                <Row></Row>
            </Container>
        </div>
    );
};

export default ViewPassword;
