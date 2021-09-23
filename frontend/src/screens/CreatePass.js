import React, { useState, useEffect } from "react";
import { Button, Container, Row, Form, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import {createPassword, listPasswords} from '../actions/passwordActions'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'

const CreatePass = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passUrl, SetPassUrl] = useState("");
    const [description, SetDescription] = useState("");
    const [note, SetNote] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch()
    
    const newPass = useSelector(state => state.createPassword)
    const { error, loading, userInfo } = newPass


    const submitHandler = (e) => {
        e.preventDefault()
        console.log("chala")

        dispatch(
            createPassword(name,passUrl,password,description,note)
        )
            
        dispatch(listPasswords())

        setMessage(name + " Password Added!")
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <h2>Create New Password</h2>
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
                <FormContainer>
                    {message && <Message variant="success">{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
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
                                    autocomplete="new-password"
                                    required
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label column sm="2">
                                Password
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    autocomplete="new-password"
                                    required
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
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
                                <Form.Control
                                    type="text"
                                    placeholder="URL"
                                    value={passUrl}
                                    onChange={(e) => SetPassUrl(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formPlaintextEmail"
                        >
                            <Form.Label column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => SetDescription(e.target.value)}
                                />
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
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Leave a Note here!"
                                    value={note}
                                    onChange={(e) => SetNote(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                </FormContainer>
            </Row>
        </Container>
    );
};

export default CreatePass;
