import axios from "axios"
import { getUserData } from "./Storage";

// axios.defaults.baseURL = 'https://identitytoolkit.googleapis.com/v1'
const API_KEY = "AIzaSyBkD0z1Yp_HNqbjD4DPCXkK37_Sjm0yXGM"
const REGISTER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

const USER_DATA ='https://projectlogin-c8cb3-default-rtdb.firebaseio.com/'


export const RegisterApi = (inputs) =>{
    let data = {
        displayName:inputs.name,
        email:inputs.email,
        mobile:inputs.mobile,
        place:inputs.place,
        password:inputs.password
    }
    return axios.post(REGISTER_URL,data)
}

export const LoginApi = (inputs) =>{
    let data = {
        email:inputs.email,
        password:inputs.password
    }
    return axios.post(LOGIN_URL,data)
}

export const UserDetailsApi = ()=>{
    let data = {idToken:getUserData()}
    return axios.post(USER_DETAILS_URL,data)
}

export const UserDataApi = (inputs) =>{
    let data = {
        name:inputs.name,
        email:inputs.email,
        mobile:inputs.mobile,
        place:inputs.place,
    }
    return axios.post (USER_DATA,data)
}