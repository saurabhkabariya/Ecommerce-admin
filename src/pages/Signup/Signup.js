import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/images/logo.png'
import { Mycontext } from '../../App'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Backdrop, Button, CircularProgress } from '@mui/material';
import google from '../../assets/images/Google.png'
import { FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FaHome } from "react-icons/fa";
import { postdata } from '../../utils/api';

import { firebaseapp } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth=getAuth(firebaseapp);
const provider=new GoogleAuthProvider();

const Signup = () => {
    const context=useContext(Mycontext)
    const [inputindex, setinputindex] = useState(null)
    const [isshowpass, setisshowpass] = useState(false)
    const [isloading, setisloading] = useState(false)
    const [isshowconfirmpass, setisshowconfirmpass] = useState(false)
    const [formfield, setformfield] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        confirmpassword:"",
        isadmin:true
    })

    const history= useNavigate();

    useEffect(() => {
      context.setishidesidebarandheader(true)
      window.scrollTo(0,0)
    }, [])

    const focusInput=(index)=>{
        setinputindex(index)
    }

    const onchangeinput=(e)=>{
        setformfield(()=>({
            ...formfield,
            [e.target.name]:e.target.value
        }))
    }

    const signup=(e)=>{
        e.preventDefault();

        try{

            if(formfield.name===""){
                context.setalertbox({
                    open:true,
                    color:"error",
                    msg:"Name cannot be blank!"
                })
                return false;
            }
            if(formfield.email===""){
                context.setalertbox({
                    open:true,
                    color:"error",
                    msg:"Email cannot be blank!"
                })
                return false;
            }
            if(formfield.phone===""){
                context.setalertbox({
                    open:true,
                    color:"error",
                    msg:"Phone number cannot be blank!"
                })
                return false;
            }
            if(formfield.password===""){
                context.setalertbox({
                    open:true,
                    color:"error",
                    msg:"Password cannot be blank!"
                })
                return false;
            }
            if(formfield.confirmpassword !== formfield.password){
                context.setalertbox({
                    open:true,
                    color:"error",
                    msg:"Please Confirm password properly!"
                })
                return false;
            }
            setisloading(true);
            postdata('/api/user/signup',formfield).then((res)=>{
                if(res.error!==true){
                    context.setalertbox({
                        open:true,
                        color:"success",
                        msg:"Registered successfully!"
                    })
                    
                    setTimeout(()=>{
                        history("/login");
                    },1000)
                    setisloading(false);
                    return true;

                }
                else{
                    context.setalertbox({
                        open:true,
                        color:"erroe",
                        msg:res.msg
                    })
                    setisloading(false);
                }
            })
    
            
        }
        catch(err){
            console.log(err);
            
        }
        
    }

    const signinwithgoogle=()=>{
                signInWithPopup(auth, provider).then((res)=>{
                  const credential = GoogleAuthProvider.credentialFromResult(res);
                  const token = credential.accessToken;
    
                  const user = res.user;
    
                  const fields={
                    name:user.providerData[0].displayName,
                    email:user.providerData[0].email,
                    password:null,
                    images:user.providerData[0].photoURL,
                    phone:user.providerData[0].phoneNumber
    
                  }
                  setisloading(true);
                  postdata("/api/user/authwithgoogle",fields).then((res)=>{
                    try{
                      if(res.error !== true){
                        localStorage.setItem("token",res.token);
                        const user={
                          name:res.user?.name,
                          email:res.user?.email,
                          id:res.user?.id
                        }
                        localStorage.setItem("user",JSON.stringify(user));
    
                        context.setalertbox({
                          open:true,
                          color:"success",
                          msg:"Loggedin successfully!"
                        })
    
                        setTimeout(() => {
                          setisloading(false);
                          window.location.href="/";
                        }, 2000);
                      }
                      else{
                        context.setalertbox({
                          open:true,
                          color:"error",
                          msg:"Failed to login!"
                        })
                        setisloading(false);
                      }
    
                    }
                    catch(err){
                      console.log(err);
                      setisloading(false);
                      
                    }
                  });
    
                  context.setalertbox({
                    open:true,
                    color:"success",
                    msg:"User Authenticated Successfully!"
                  })
                }).catch((err)=>{
                  const errorCode = err.code;
                  const errorMessage = err.message;
                  const email = err.customData.email;
                  const credential = GoogleAuthProvider.credentialFromError(err);
                  context.setalertbox({
                    open:true,
                    color:"error",
                    msg:errorMessage
                  })
                })
              }
    
    
  return (
    <>
        <section className='loginsection signupsection'>
            <div className='imgpattern'>
                <img src='https://dashboard-ecommerce-react.netlify.app/static/media/pattern.df9a7a28fc13484d1013.webp' alt='pattern'/>
            </div>
        
        <div className='row'>
            <div className='col-md-8 d-flex align-items-center flex-column part-1 justify-content-center'>
                <h1>BEST UX/UI FASHION <span className='text-blue'> ECOMMERCE DASHBOARD </span> & ADMIN PANEL</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                <div className='w-100 mt-4 homebtn'>
                    <Link to='/'><Button className='btn-blue btn-lg d-flex align-items-center justify-content-center py-2 px-4'><FaHome className='mr-2' /><span className='txt'>Go To Home</span></Button></Link>
                </div>
            </div>
            <div className='col-md-4'>
                <div className='loginbox d-flex align-items-center'>
                <div className='logo text-center'><Link to='/' onClick={()=>context.setishidesidebarandheader(false)}><img src={Logo} alt='logo' width='150px'/></Link></div>
                <h5 className='font-weight-bold mt-4'>Register a new account</h5>
                <div className='wrapper mt-3 card border p-3'>
                    <form  onSubmit={signup}>
                        <div className={`formgroup mb-3 position-relative ${inputindex ===0 && 'focus'}`}>
                            <div className='icon'><FaUserCircle /></div>
                            <input type='text' className='formcontrol w-100' placeholder='Enter Your Name:' onFocus={()=>{focusInput(0)}} onBlur={()=>{focusInput(null)}} autoFocus name="name" onChange={onchangeinput}/>
                        </div>
                        <div className={`formgroup mb-3 position-relative ${inputindex ===1 && 'focus'}`}>
                            <div className='icon'><IoMail /></div>
                            <input type='email' className='formcontrol w-100' placeholder='Enter Your Email:' onFocus={()=>{focusInput(1)}} onBlur={()=>{focusInput(null)}} name="email" onChange={onchangeinput}/>
                        </div>
                        <div className={`formgroup mb-3 position-relative ${inputindex ===2 && 'focus'}`}>
                            <div className='icon'><IoMail /></div>
                            <input type='text' className='formcontrol w-100' placeholder='Enter Your phone number:' onFocus={()=>{focusInput(2)}} onBlur={()=>{focusInput(null)}} name="phone" onChange={onchangeinput}/>
                        </div>
                        <div className={`formgroup mb-3 position-relative ${inputindex ===3 && 'focus'}`}>
                            <div className='icon'><RiLockPasswordFill /></div>
                            <input type={isshowpass===true ? 'text' : 'password' } className='formcontrol w-100' placeholder='Enter Your Password:' onFocus={()=>{focusInput(3)}} onBlur={()=>{focusInput(null)}} name="password" onChange={onchangeinput}/>
                            <span className='toggleshowpass' onClick={()=>setisshowpass(!isshowpass)}>
                                {isshowpass===true ? <IoIosEyeOff /> :  <IoIosEye /> }
                            </span>
                        </div>
                        <div className={`formgroup mb-3 position-relative ${inputindex ===4 && 'focus'}`}>
                            <div className='icon'><IoShieldCheckmark /></div>
                            <input type={isshowconfirmpass===true ? 'text' : 'password' } className='formcontrol w-100' placeholder='Confirm Your Password:' onFocus={()=>{focusInput(4)}} onBlur={()=>{focusInput(null)}} name="confirmpassword" onChange={onchangeinput}/>
                            <span className='toggleshowpass' onClick={()=>setisshowconfirmpass(!isshowconfirmpass)}>
                                {isshowconfirmpass===true ? <IoIosEyeOff /> :  <IoIosEye /> }
                            </span>
                        </div>
                        <FormControlLabel required control={<Checkbox />} label="I agree to all Terms & Condiotions" className='signupcheckbox' />
                        <div className='formgroup'>
                            <Button className="btn-blue btn-lg w-100 py-2" type='submit'>Sign up</Button>
                        </div>
                        {isloading === true && (
                                          <Backdrop
                                            sx={(theme) => ({
                                              color: "#fff",
                                              zIndex: theme.zIndex.drawer + 1,
                                            })}
                                            open={isloading}
                                          >
                                            <CircularProgress color="inherit" />
                                          </Backdrop>
                                        )}
                        
                        <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
                            <span className='line'></span>
                            <span className='txt'>or</span>
                            <span className='line'></span>
                        </div>
                        <div className='formgroup text-center mb-0'>
                            <Button variant='outlined' className='w-100 btn-lg loginwithgoogle' onClick={signinwithgoogle}><img src={google} className='mr-1' alt='google'/> Sign up with google</Button>
                        </div>
                    </form>
                    <div className='wrapper mt-3 card border footer p-1'>
                        <span className='text-center'>Already have an account? <Link to='/login' className='ml-1'>Login</Link></span>
                    </div>
                </div>
        
                
            </div>
            </div>
        </div>

        
    
        </section>
        </>
  )
}

export default Signup
