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

export const createPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSWORD_CREATE_REQUEST:
            return { loading: true };

        case PASSWORD_CREATE_SUCCESS:
            return { loading: false, success: true, password: action.payload };

        case PASSWORD_CREATE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const passwordListReducer = (state = { passwords: [] }, action) => {
    switch (action.type) {
        case PASSWORD_LIST_REQUEST:
            return { loading: true, passwords: [] };

        case PASSWORD_LIST_SUCCESS:
            return { loading: false, passwords: action.payload };

        case PASSWORD_LIST_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};


export const passwordDetailReducer = (state={password:{}}, action) => {
    switch(action.type) {
        case PASSWORD_DETAILS_REQUEST:
            return {loading:true, ...state}

        case PASSWORD_DETAILS_SUCCESS:
            return {loading:false, password: action.payload}

        case PASSWORD_DETAILS_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}


export const updatePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSWORD_UPDATE_REQUEST:
            return { loading: true };

        case PASSWORD_UPDATE_SUCCESS:
            return { loading: false, success: true, password: action.payload };

        case PASSWORD_UPDATE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};


export const deletePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSWORD_DELETE_REQUEST:
            return { loading: true };

        case PASSWORD_DELETE_SUCCESS:
            return { loading: false, success: true };

        case PASSWORD_DELETE_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};