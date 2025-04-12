import './App.css';
import './responsive.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Home/Dashboard';
import Header from './components/header/Header';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar2 from './components/sidebar/Sidebar2';
// import Sidebar from './components/sidebar/Sidebar';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Productdetails from './pages/Products/Productdetails';
import Products from './pages/Products/Products';
import Productupload from './pages/Products/Productupload';
import Categoryadd from './pages/Category/Categoryadd';
import Category from './pages/Category/Category';
// import Test from './pages/test';

// import { SnackbarProvider, useSnackbar } from 'notistack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import LoadingBar from "react-top-loading-bar";
import Categoryedit from './pages/Category/Categoryedit';
import Productedit from './pages/Products/Productedit';
import { fetchdatafromapi } from './utils/api';
import Subcatadd from './pages/Category/Subcatadd';
import Subcategory from './pages/Category/Subcategory';
import Subcatedit from './pages/Category/Subcatedit';
import Productrams from './pages/Products/productrams';
import Productsize from './pages/Products/productsize';
import Productweight from './pages/Products/productweight';
import Orders from './pages/Orders/Orders';
import Homebanner from './pages/homebanner/Homebanner';
import Bannerupload from './pages/homebanner/Bannerupload';
import Banneredit from './pages/homebanner/Banneredit';
import axios from 'axios';
import { Backdrop, CircularProgress } from '@mui/material';

import Myaccount from './pages/myaccount/Myaccount';



const Mycontext = createContext();

function App() {
  const context=useContext(Mycontext);

  const [countryList, setcountryList] = useState([])
  const [selectedCountry, setselectedCountry] = useState('');

  const [prodcount,setprodcount]=useState(0);
  const [catcount,setcatcount]=useState(0);
  const [subcatcount,setsubcatcount]=useState(0);

  const [isloading, setisloading] = useState(false);

  const [istogglesidebar, setistogglesidebar] = useState(false);
  const [islogin, setislogin] = useState(false);
  const [ishidesidebarandheader, setishidesidebarandheader] = useState(false);
  const [windowwidth, setwindowwidth] = useState(window.innerWidth);
  const [isopennav, setisopennav] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alertbox, setalertbox] = useState({
    msg:'',
    color:'',
    open:false
  });
  const [catdata, setcatdata] = useState([]);
  const [subcatdata, setsubcatdata] = useState([]);
  const [user, setuser] = useState({
    name:"",
    email:"",
    userid:""
  });

  const baseURL=process.env.REACT_APP_BASE_URL;

  useEffect(() => {
      window.scrollTo(0, 0);
      setisloading(true);
      getCountry('https://countriesnow.space/api/v0.1/countries/')
      setisloading(false);
  
      setProgress(20);
        fetchcategory();
        fetchsubcategory();
        fetchprodcount();
        fetchcatcount();
        fetchsubcatcount();
      setProgress(100);
    }, []);

    const fetchcategory = () => {
      fetchdatafromapi("/api/category").then((res) => {
        setcatdata(res.categorylist);
      });
    }
    const fetchhomebanner = () => {
      fetchdatafromapi("/api/homebanner").then((res) => {
        setcatdata(res);
      });
    }
    const fetchsubcategory = () => {
      fetchdatafromapi("/api/category").then((res) => {
        setsubcatdata(res.categorylist);
      });
    }

    const fetchprodcount=()=>{
      fetchdatafromapi("/api/products/count").then((res)=>{
        setprodcount(res?.prodcount);
      });
    }
    const fetchcatcount=()=>{
      fetchdatafromapi("/api/category/count").then((res)=>{
        setcatcount(res?.catcount);
      });
    }
    const fetchsubcatcount=()=>{
      fetchdatafromapi("/api/category/subcat/count").then((res)=>{
        setsubcatcount(res?.subcatcount);
      });
    }

    const countrylistarr=[];

     const getCountry=async (url)=>{
        await axios.get(url).then((res)=>{
          setcountryList(res.data.data)
        })

        // const responsive=await axios.get(url).then((res)=>{
        //   if(res !== null){
        //     res.data.data.map((item)=>{
        //       countrylistarr.push({
        //         value:item?.iso2,
        //         label:item?.country,
        //       })
        //     })

        //     setcountryList(countrylistarr);
        //   }
        // })
      }


  // const handleClick = () => {
  //   setalertbox({
  //     open:true
  //   });
  // };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

  setalertbox({
    open:false,
  });
  }
  
  

  // const { enqueueSnackbar } = useSnackbar();
  //   const handleClickVariant = (variant) => () => {
  //     // variant could be success, error, warning, info, or default
  //     enqueueSnackbar('This is a success message!', { variant });
  //   };
  

 

  const location = useLocation(); // Get current route location

  useEffect(() => {
    const handleresize = () => {
      setwindowwidth(window.innerWidth);
    };

    window.addEventListener('resize', handleresize);
    return () => {
      window.removeEventListener('resize', handleresize);
    };
  }, []);

  // Control header/sidebar visibility based on route
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/signup') {
      setishidesidebarandheader(true);
    } else {
      setishidesidebarandheader(false);
    }
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location]);

  useEffect(()=>{
    const token=localStorage.getItem("token");
    if (token !== null && token!==""){
      setislogin(true);
      const userdata=JSON.parse(localStorage.getItem("user"));
      setuser(userdata);
    }
    else{
      setislogin(false);
    }
  },[islogin])

  const opennav = () => {
    setisopennav(!isopennav);
  };

  const values = {
    countryList,
    selectedCountry,
    setselectedCountry,
    istogglesidebar,
    setistogglesidebar,
    islogin,
    setislogin,
    ishidesidebarandheader,
    setishidesidebarandheader,
    windowwidth,
    opennav,
    isopennav,
    setisopennav,
    alertbox,
    setalertbox,
    setProgress,
    progress,
    baseURL,
    catdata,
    setcatdata,
    fetchcategory,
    subcatdata,
    fetchsubcategory,
    user,
    setuser,
    fetchhomebanner,
    setprodcount,
    prodcount,
    setcatcount,
    catcount,
    setsubcatcount,
    subcatcount,
    fetchprodcount,
    fetchcatcount,
    fetchsubcatcount
    // handleClickVariant
  };

  return (
    <Mycontext.Provider value={values}>
      <LoadingBar
        color="rgb(89, 89, 232)"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        className='toploadingbar'
      />
      <Snackbar open={alertbox.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertbox.color === "success" ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertbox.msg}
        </Alert>
      </Snackbar>
      {/* <SnackbarProvider maxSnack={3}> */}
        {ishidesidebarandheader !== true && <Header />}
        <div className='main d-flex'>
          {ishidesidebarandheader !== true && (
            <>
              <div className={`sidebaroverlay d-none ${isopennav === true ? 'show' : ''}`} onClick={() => setisopennav(false)}></div>
              <div className={`sidebarwrapper ${istogglesidebar === true ? 'toggle' : ''} ${isopennav === true ? 'open' : ''}`}>
                {/* <Sidebar /> */}
                <Sidebar2/>
              </div>
            </>
          )}
          <div className={`content ${ishidesidebarandheader === true ? 'full' : ''} ${istogglesidebar === true ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
              <Route path="/login" exact={true} element={<Login />} />
              <Route path="/signup" exact={true} element={<Signup />} />
              <Route path="/products" exact={true} element={<Products />} />
              <Route path="/products/productdetails/:id" exact={true} element={<Productdetails />} />
              <Route path="/products/productupload" exact={true} element={<Productupload />} />
              <Route path="/products/edit/:id" exact={true} element={<Productedit />} />
              <Route path="/category" exact={true} element={<Category />} />
              <Route path="/category/categoryadd" exact={true} element={<Categoryadd />} />
              <Route path="/category/categoryedit/:id" exact={true} element={<Categoryedit />} />
              <Route path="/subcategory" exact={true} element={<Subcategory />} />
              <Route path="/subcategory/add" exact={true} element={<Subcatadd />} />
              <Route path="/subcategory/edit/:id" exact={true} element={<Subcatedit />} />
              <Route path="/productrams/add" exact={true} element={<Productrams />} />
              <Route path="/productsize/add" exact={true} element={<Productsize />} />
              <Route path="/productweight/add" exact={true} element={<Productweight />} />
              <Route path="/orders" exact={true} element={<Orders />} />
              <Route path="/homebanner" exact={true} element={<Homebanner />} />
              <Route path="/homebanner/bannerupload" exact={true} element={<Bannerupload />} />
              <Route path="/homebanner/banneredit/:id" exact={true} element={<Banneredit />} />
              <Route path="/myaccount" exact={true} element={<Myaccount/>} />
              {/* <Route path="/test" exact={true} element={<Test />} /> */}
            </Routes>
          </div>
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
      {/* </SnackbarProvider> */}
    </Mycontext.Provider>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export { Mycontext };
