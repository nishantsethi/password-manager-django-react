import React, { useState, useEffect } from "react";
import { Row,Col, Card, Button, Container } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { listPasswordDetails } from "../actions/passwordActions";
import { useDispatch, useSelector } from "react-redux";

const PasswordSmall = ({ pass }) => {
    const dispatch = useDispatch();


    const clickHandler = () => {
        dispatch(listPasswordDetails(pass.id));
    }


    return (
        

    <Card body> 
        <Link to={`/dashboard/pass/view/${pass.id}`} onClick={clickHandler}>
        <i className="fas fa-key"></i>  {pass.name}
        </Link>
    </Card>
    );
};

export default PasswordSmall;
