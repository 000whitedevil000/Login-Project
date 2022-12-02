import React from 'react'
import './styles/LoginPage.css'
import Navbar from '../components/Navbar.js'
import { useState } from 'react'
import { LoginApi } from '../services/Api'
import { storeUserData } from '../services/Storage'
import { Link, Navigate } from 'react-router-dom'
import { isAuthenticated } from '../services/Auth' 


function LoginPage() {

    const initialStateErrors  = {
        email:{required:false},
        password:{required:false},
        custom_error:null
    }

    const [inputs,setInputs]  = useState({
        email:"",
        password:""
      })
      
    const[errors,setErrors]  = useState(initialStateErrors);


    const [loading,setLoading]   =   useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
        let errors =initialStateErrors;
        let hasError =false;
       
        if (inputs.email === ""){
          errors.email.required =true;
          hasError =true;
        }
        
        if (inputs.password ===  ""){
          errors.password.required  =true;
          hasError =true;
        }
        if(!hasError){
          setLoading(true)
          //sending Login Api request
          LoginApi(inputs).then((response)=>{
            storeUserData(response.data.idToken);
          }).catch((err)=>{
    
            console.log(err)

            if(err.code==="ERR_BAD_REQUEST"){
                setErrors({...errors,custom_error:'Invalid credentials!'})
              }
            
          }).finally(()=>{
            setLoading(false);
          })
        }
    
        setErrors({...errors});
      }

      const handleInput = (e)=>{
        setInputs({...inputs,[e.target.name]:e.target.value})
    
      }

      if (isAuthenticated()){
        return <Navigate to="/Profile" />    
      }

  return (

    <>
        <Navbar/>


        <div fluid className='p-5 bg-info' style={{minHeight:'100vh'}}>


            <section className="login-block p-5 mb-2">
                <div className="container">
                    <div className="row ">
                        <div className="col login-sec">
                        <h2 className="text-center">Login Now</h2>
                            <form className="login-form" action onSubmit={handleSubmit}>
                                <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                <input type="email" className="form-control" onChange={handleInput} name="email" id placeholder="email" />
                                {errors.email.required?
                                (<span className="text-danger">
                                    Email is required.
                                </span>):null
                                }
                                </div>

                                <div className="form-group">
                                <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                <input className="form-control" onChange={handleInput} type="password" name="password" placeholder="password" id />
                                {errors.password.required?
                                (<span className="text-danger">
                                    Password is required.
                                </span>):null
                                }
                                </div>

                                <div className="form-group">
                                {loading?
                                (<div className="text-center">
                                    <div className="spinner-border text-primary " role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>):null
                                }

                                <span className="text-primary">
                                    <p><a href='./ForgotPassword'>Forgot password</a></p>
                                </span>

                                {errors.custom_error?
                                (<span className="text-danger">
                                    <p>{errors.custom_error}</p>
                                </span>):null
                                }
                                <input type="submit" className="btn btn-login float-right" disabled={loading} defaultValue="Login" />
                                </div>

                                <div className="clearfix" />
                                <div className="form-group">
                                Create new account ? Please <Link to='/register'>Register</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </div>

    </>
    
  )
}

export default LoginPage