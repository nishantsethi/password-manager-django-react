import axios from "axios";
import {
    PASSWORD_CREATE_REQUEST,
    PASSWORD_CREATE_SUCCESS,
    PASSWORD_CREATE_FAIL,


    PASSWORD_LIST_REQUEST,
    PASSWORD_LIST_SUCCESS,
    PASSWORD_LIST_FAIL,

    PASSWORD_DETAILS_REQUEST,
    PASSWORD_DETAILS_SUCCESS,
    PASSWORD_DETAILS_FAIL,

    PASSWORD_UPDATE_REQUEST,
    PASSWORD_UPDATE_SUCCESS,
    PASSWORD_UPDATE_FAIL,

    PASSWORD_DELETE_REQUEST,
    PASSWORD_DELETE_SUCCESS,
    PASSWORD_DELETE_FAIL,

} from "../constants/passwordConstants";





export const createPassword = (name, url,password, description, note) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PASSWORD_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            '/api/passwords/create/pass/',
            {'group': '1', 'name':name, 'password':password, 'url':url, 'description':description, 'note':note},
            config
        )

        dispatch({
            type: PASSWORD_CREATE_SUCCESS,
            payload: data,
        })


    } catch(error) {
        
        dispatch({
            type: PASSWORD_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}


export const listPasswords = () => async (dispatch, getState) => {

    try {
        dispatch({type: PASSWORD_LIST_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get('/api/passwords/apppass/',config)

        dispatch({
            type: PASSWORD_LIST_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: PASSWORD_LIST_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message,
        })
    }

}

export const listPasswordDetails = (id) => async (dispatch, getState) => {

    try {
        dispatch({type: PASSWORD_DETAILS_REQUEST})

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }


        const {data} = await axios.get(`/api/passwords/get/pass/${id}`, config)

        dispatch({
            type: PASSWORD_DETAILS_SUCCESS,
            payload: data
        })
    } catch(error){
        dispatch({
            type: PASSWORD_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail : error.message,
        })
    }

}

export const updatePassword = (id, name, url,password, description, note) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PASSWORD_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(
            `/api/passwords/update/pass/${id}`,
            {'group': '1', 'name':name, 'password':password, 'url':url, 'description':description, 'note':note},
            config
        )

        dispatch({
            type: PASSWORD_UPDATE_SUCCESS,
            payload: data,
        })


    } catch(error) {
        
        dispatch({
            type: PASSWORD_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}


export const deletePassword = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PASSWORD_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(
            `/api/passwords/delete/pass/${id}`,
            config
        )

        dispatch({
            type: PASSWORD_DELETE_SUCCESS,
        })


    } catch(error) {
        
        dispatch({
            type: PASSWORD_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}