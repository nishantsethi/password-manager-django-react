import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard = ({history}) => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            console.log("Login he")
        }
    })




    return (
        <div>
            <h1>
                This is dashboard
            </h1>
        </div>
    )
}

export default Dashboard
