import React from 'react'
import './styles/LoginPage.css'
import Navbar from '../components/Navbar.js'
import { useState } from 'react'

function LoginPage() {

    const[errors,setErrors]  = useState({
        email:{required:false},
        custom_error:null
    })

    const [loading,setLoading]   =   useState(false);
  return (

    <>
        <Navbar/>


        <div fluid className='p-5 bg-info' style={{minHeight:'100vh'}}>


            <section className="login-block p-5 mb-2">
                <div className="container">
                    <div className="row ">
                        <div className="col login-sec">
                        <h2 className="text-center">Forgot Password</h2>
                            <form className="login-form" action>
                                <div className="form-group">
                                <label htmlFor="exampleInputEmail1" className="text-uppercase">Enter Your Email</label>
                                <input type="email" className="form-control" name="email" id placeholder="email" />
                                {errors.email.required?
                                (<span className="text-danger">
                                    Email is required.
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
                                {errors.custom_error?
                                (<span className="text-danger">
                                    <p>Custom Error Message!</p>
                                </span>):null
                                }
                                <input type="submit" className="btn btn-login float-right" defaultValue="Login" />
                                </div>

                                <div className="clearfix" />
                                <div className="form-group">
                                Already have account ? Please <a href="/">Login</a>
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