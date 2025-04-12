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
import { postdata } from '../../utils/api'

import { firebaseapp } from "../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth=getAuth(firebaseapp);
const provider=new GoogleAuthProvider();

const Login = () => {
    const context=useContext(Mycontext)
    const [inputindex, setinputindex] = useState(null)
    const [isloading, setisloading] = useState(false)
    const [isshowpass, setisshowpass] = useState(false)
    const [formfield, setformfield] = useState({
            email:"",
            password:"",
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

    const login=(e)=>{
            e.preventDefault();
            
            if(formfield.email===""){
                context.setalertbox({
                    open:true,
                    color:"error",
                    msg:"Email cannot be blank!"
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
            setisloading(true);
    
            postdata('/api/user/signin',formfield).then((res)=>{
                try{

                    if(res.error !== true){

                        localStorage.setItem("token",res.token);
    
                        const user={
                            name:res.user?.name,
                            email:res.user?.email,
                            id:res.user?.id
                        };
                        
                        localStorage.setItem("user",JSON.stringify(user));
    
                        context.setuser({
                            name:res.user?.name,
                            email:res.user?.email
                        })
                        context.setalertbox({
                            open:true,
                            color:"success",
                            msg:"Loggedin successfully!"
                        })
                        setTimeout(()=>{
                            // history("/");
                            window.location.href="/";
                        },1000)
                        setisloading(false);
                        return true;
                    }
                    else{
                        context.setalertbox({
                            open:true,
                            color:"error",
                            msg:res.msg
                        })
                        setisloading(false);

                    }
                    
                }
                catch(err){
                    console.log(err);
                    context.setalertbox({
                        open:true,
                        color:"error",
                        msg:"User not Found!"
                    })
                    setisloading(false);

                }
            })
        
                
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
    
    <section className='loginsection'>
        <div className='imgpattern'>
            <img src='https://dashboard-ecommerce-react.netlify.app/static/media/pattern.df9a7a28fc13484d1013.webp' alt='pattern'/>
        </div>
      <div className='loginbox d-flex align-items-center'>
        <div className='logo text-center'><Link to='/' onClick={()=>context.setishidesidebarandheader(false)}><img src={Logo} alt='logo' width='150px'/></Link></div>
        <h5 className='font-weight-bold mt-4'>Login to PickNBuy</h5>
        <div className='wrapper mt-3 card border p-4'>
            <form onSubmit={login}>
                <div className={`formgroup mb-3 position-relative ${inputindex ===0 && 'focus'}`}>
                    <div className='icon'><IoMail /></div>
                    <input type='email' className='formcontrol w-100' placeholder='Enter Your Email:' onFocus={()=>{focusInput(0)}} onBlur={()=>{focusInput(null)}} autoFocus name='email' onChange={onchangeinput}/>
                </div>
                <div className={`formgroup mb-3 position-relative ${inputindex ===1 && 'focus'}`}>
                    <div className='icon'><RiLockPasswordFill /></div>
                    <input type={isshowpass===true ? 'text' : 'password' } className='formcontrol w-100' placeholder='Enter Your Password:' onFocus={()=>{focusInput(1)}} onBlur={()=>{focusInput(null)}} name='password' onChange={onchangeinput}/>
                    <span className='toggleshowpass' onClick={()=>setisshowpass(!isshowpass)}>
                        {isshowpass===true ? <IoIosEyeOff /> :  <IoIosEye /> }
                    </span>
                </div>
                <div className='formgroup'>
                    <Button type='submit' className="btn-blue btn-lg w-100 py-2">Sign in</Button>
                </div>
                <div className='formgroup d-flex justify-content-center mt-2'>
                    <Link to='/forgetpassword' className='link'>Forgot Password</Link>
                </div>
                <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
                    <span className='line'></span>
                    <span className='txt'>or</span>
                    <span className='line'></span>
                </div>
                <div className='formgroup text-center mb-0'>
                    <Button variant='outlined' className='w-100 btn-lg loginwithgoogle' onClick={signinwithgoogle}><img src={google} className='mr-1' alt='google'/> Sign in with google</Button>
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
            </form>
        </div>

        <div className='wrapper mt-3 card border p-4 footer p-3'>
            <span className='text-center'>Don't have an account? <Link to='/signup' className='ml-1'>Register</Link></span>
        </div>
      </div>

    </section>
    </>
  )
}

export default Login
