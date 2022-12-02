import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { UserDetailsApi } from '../services/Api';
import './styles/profile.css'


function ProfilePage() {
  const [user,setUser] = useState({name:'',email:'',mobile:'',place:'',localId:''})


  useEffect(()=>{
    UserDetailsApi().then((response)=>{
      setUser({
        name:response.data.users[0].displayName,
        email:response.data.users[0].email,
        localId:response.data.users[0].localId
      })

    })

  },[])















  let navigate = useNavigate();

  const logout = (e) => {
      e.preventDefault();
      localStorage.clear();
      navigate('/login');
    };

  return (

    <>

    <Navbar />

    <div fluid='true' className='p-5 bg-info' style={{minHeight:'100vh'}}>

      {user.name && user.email ?

        (<div>
            <div className="profile-container">
              <div className="row flex-lg-nowrap">
                <div className="col-12 col-lg-auto mb-3" style={{width: '200px'}}>
                  <div className="card p-3">
                    <div className="e-navlist e-navlist--active-bg">
                      <ul className="nav">
                        <li className="nav-item"><a className="nav-link px-2 active" href={"#".toString()}><i className="fa fa-fw fa-bar-chart mr-1" /><span>Overview</span></a></li>
                        <li className="nav-item"><a className="nav-link px-2" href={"#".toString()} target="__blank"><i className="fa fa-fw fa-cog mr-1" /><span>Settings</span></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="row">
                    <div className="col mb-3">
                      <div className="card">
                        <div className="card-body">
                          <div className="e-profile">
                            <div className="row">
                              <div className="col-12 col-sm-auto mb-3">
                                <div className="mx-auto" style={{width: '140px'}}>
                                  <div className="d-flex justify-content-center align-items-center rounded" style={{height: '140px', backgroundColor: 'rgb(233, 236, 239)'}}>
                                    <span style={{color: 'rgb(166, 168, 170)', font: 'bold 8pt Arial'}}>image</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                <div className="text-center text-sm-left mb-2 mb-sm-0">
                                  <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{user.name}</h4>
                                  <p className="mb-0">Place</p>
                                  <div className="mt-2">
                                    <button className="btn btn-primary" type="button">
                                      <i className="fa fa-fw fa-camera" />
                                      <span>Change Photo</span>
                                    </button>
                                  </div>
                                </div>                            
                              </div>
                            </div>
                            <ul className="nav nav-tabs">
                              <li className="nav-item"><a href={"#".toString()} className="active nav-link">Settings</a></li>
                            </ul>
                            <div className="tab-content pt-3">
                              <div className="tab-pane active">
                                <form className="form" noValidate>
                                  <div className="row">
                                    <div className="col">
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Full Name</label>
                                            <input className="form-control" type="text" name="fname" placeholder="First Name" defaultValue={user.name} />
                                          </div>
                                        </div>
                                        
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Email</label>
                                            <input className="form-control" type="text" defaultValue={user.email} placeholder="user@example.com" />
                                            
                                          </div>

                                          <div className="form-group">
                                            <label>Phone</label>
                                            <input className="form-control" type="text" placeholder="+91" />
                                            
                                          </div>
                                        </div>
                                      </div>


                                      <div className="row">
                                        <div className="col mb-3">
                                          <div className="form-group">
                                            <label>Address</label>
                                            <textarea className="form-control" rows={5} placeholder="Address" defaultValue={""} />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-12 col-sm-6 mb-3">
                                      <div className="mb-2"><b>Change Password</b></div>
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Current Password</label>
                                            <input className="form-control" type="password" placeholder="••••••" />
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>New Password</label>
                                            <input className="form-control" type="password" placeholder="••••••" />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col">
                                          <div className="form-group">
                                            <label>Confirm <span className="d-none d-xl-inline">Password</span></label>
                                            <input className="form-control" type="password" placeholder="••••••" /></div>
                                        </div>
                                      </div>
                                      
                                    </div>
                                   
                                  </div>
                                  
                                  <div className="row">
                                    <div className="col d-flex justify-content-end">
                                      <button className="btn btn-primary" type="submit">Save Changes</button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mb-3">
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="px-xl-3">
                            <button className="btn btn-block btn-secondary" onClick={logout}>
                              <i className="fa fa-sign-out" />
                              <span>Logout</span>
                            </button>
                            
                          </div>
                        </div>
                      </div>
                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>):<p>Loading...</p>

      }

    </div>

    </>
  )
}

export default ProfilePage