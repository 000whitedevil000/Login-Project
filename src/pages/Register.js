import React from 'react'
import Navbar from '../components/Navbar'
import './styles/RegisterPage.css'
import { useState } from 'react'
import {RegisterApi, UserDataApi} from '../services/Api.js'
import { storeUserData } from '../services/Storage'
import { isAuthenticated } from '../services/Auth'
import { Link, Navigate } from 'react-router-dom'

function RegisterPage() {

  const initialStateErrors  = {
    name:{required:false},
    email:{required:false},
    mobile:{required:false},
    place:{required:false},
    password:{required:false},
    custom_error:null
  }
  
  const[errors,setErrors]  = useState(initialStateErrors);
  
  const [loading,setLoading]  = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault();
    let errors =initialStateErrors;
    let hasError =false;
    if (inputs.name === ""){
      errors.name.required=true;
      hasError =true;
    }
    if (inputs.email === ""){
      errors.email.required =true;
      hasError =true;
    }
    if (inputs.mobile ===  ""){
      errors.mobile.required  =true;
      hasError =true;
    }
    if (inputs.place ===  ""){
      errors.place.required  =true;
      hasError =true;
    }
    if (inputs.password ===  ""){
      errors.password.required  =true;
      hasError =true;
    }
    if(!hasError){
      setLoading(true)
      //sending Api request
      RegisterApi(inputs).then((response)=>{
        storeUserData(response.data.idToken)
      }).catch((err)=>{

        console.log(err)

        if(err.response.data.error.message==="EMAIL_EXISTS"){
          setErrors({...errors,custom_error:'Already this email has been registered!'})
        }
        
      }).finally(()=>{
        setLoading(false);
      })
    }

    if (!hasError){
      UserDataApi(inputs).then((response)=>{storeUserData(response.data.idToken)})
    }

    setErrors({...errors});
  }

  const [inputs,setInputs]  = useState({
    name:"",
    email:"",
    mobile:"",
    place:"",
    password:""
  })

  const handleInput = (e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value})

  }

  if (isAuthenticated()){
    return <Navigate to="/Profile" />    
  }
  
  return (

    <>
      <Navbar/>

      <div fluid className='p-5 bg-info' style={{minHeight:'150vh'}}>

        <section  className="register-block p-5 mb-2 ">
            <div className="container">
              <div className="row ">
                <div className="col register-sec">
                  <h2 className="text-center">Register Now</h2>
                  <form onSubmit={handleSubmit} className="register-form" action>

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="text-uppercase">Name</label>
                      <input type="text" className="form-control" name="name" id onChange={handleInput} />
                      { errors.name.required?
                        (<span className="text-danger">
                          Name is required.
                        </span>):null
                      }
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                      <input type="text" className="form-control" name="email" id onChange={handleInput} />
                      {errors.email.required?
                        (<span className="text-danger">
                          Email is required.
                        </span>):null
                      }
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="text-uppercase">Mobile</label>
                      <input type="tel" className="form-control" name="mobile" id onChange={handleInput} />
                      {errors.mobile.required?
                        (<span className="text-danger">
                          Mobile is required.
                        </span>):null
                      }
                    </div>  
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1" className="text-uppercase">Place</label>
                      <input type="text" className="form-control" name="place" id onChange={handleInput} />
                      {errors.place.required?
                        (<span className="text-danger">
                          Place is required.
                        </span>):null
                      }
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                      <input className="form-control" type="password" name="password" id onChange={handleInput}/>
                      {errors.password.required?
                        (<span className="text-danger">
                          Password is required.
                        </span>):null 
                      }
                    </div>
                    <div className="form-group">
                      <span className="text-danger">
                        {errors.custom_error?
                        (<p>{errors.custom_error}</p>):null
                        }
                      </span>
                      {loading?
                        (<div className="text-center">
                          <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>):null
                      }
                      <input type="submit" value="Register" disabled={loading} className="btn btn-login float-right" />
                    </div>
                    <div className="clearfix" />
                    <div className="form-group">
                      Already have account ? Please <Link to='/login'>Login</Link>
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

export default RegisterPage