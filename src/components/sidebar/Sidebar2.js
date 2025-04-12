import React, {  useContext, useState } from 'react'
import Button from "@mui/material/Button";
import { MdDashboard } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Mycontext } from '../../App';
import { FaCartArrowDown } from "react-icons/fa6";
import { TbCategoryFilled } from "react-icons/tb";


const Sidebar = () => {
    const [activetab, setactivetab] = useState(null)
    const [istogglesubmenu, setistogglesubmenu] = useState(false)

    const history=useNavigate();

    const context=useContext(Mycontext);


    const isopensubmenu=(index)=>{
        setactivetab(index)
        setistogglesubmenu(!istogglesubmenu)
    }

    const logout=()=>{
        context.setuser({
          name:"",
          email:"",
          userid:""
        })
        localStorage.clear();
        context.setislogin(false);
        context.setalertbox({
          open:true,
          color:"success",
          msg:"User logout Successfully!"
        })

        setTimeout(()=>{
          history("/login");
        },1000);

      }

  return (
    <div className='sidebar'>
      <ul>
        <Link to='/'><li><Button className={`w-100 ${activetab===0 ?'active':''}`} onClick={()=>isopensubmenu(0)} ><span className='icon'><MdDashboard /></span>Dashboard</Button></li></Link>
        <li>
            <Button className={`w-100 ${activetab===1 && istogglesubmenu===true ?'active':''}`} onClick={()=>isopensubmenu(1)}><span className='icon'><FaProductHunt /></span>Products<span className='arrow'><FaAngleDown /></span></Button>
            <div className={`submenuwrapper ${activetab===1 && istogglesubmenu===true  ?'collapse':'collapsed'}`}>
                <ul className='submenu'>
                    <Link to='/products'><li>Product List</li></Link>
                    <Link to='/products/productdetails'><li>Product View</li></Link>
                    <Link to='/products/productupload'><li>Product Upload</li></Link>
                    <Link to='/productrams/add'><li>Add Product RAMs</li></Link>
                    <Link to='/productsize/add'><li>Add Product Size</li></Link>
                    <Link to='/productweight/add'><li>Add Product Weight</li></Link>
                </ul>
            </div>
        </li>
        <li>
            <Button className={`w-100 ${activetab===2 && istogglesubmenu===true ?'active':''}`} onClick={()=>isopensubmenu(2)}><span className='icon'><TbCategoryFilled /></span>Category<span className='arrow'><FaAngleDown /></span></Button>
            <div className={`submenuwrapper ${activetab===2 && istogglesubmenu===true  ?'collapse':'collapsed'}`}>
                <ul className='submenu'>
                    <Link to='/category'><li>Category List</li></Link>
                    <Link to='/category/categoryadd'><li>Add Category</li></Link>
                    <Link to='/subcategory'><li>Sub Category List</li></Link>
                    <Link to='/subcategory/add'><li>Add Sub Category</li></Link>
                </ul>
            </div>
        </li>
        <Link to='/orders'>
        <li>
            <Button className={`w-100 ${activetab===3 && istogglesubmenu===true ?'active':''}`} onClick={()=>isopensubmenu(3)}><span className='icon'><FaCartArrowDown /></span>Orders</Button>
        </li>
        </Link>

        <li>
            <Button className={`w-100 ${activetab===4 && istogglesubmenu===true ?'active':''}`} onClick={()=>isopensubmenu(4)}><span className='icon'><TbCategoryFilled /></span>Homebanner<span className='arrow'><FaAngleDown /></span></Button>
            <div className={`submenuwrapper ${activetab===4 && istogglesubmenu===true  ?'collapse':'collapsed'}`}>
                <ul className='submenu'>
                    <Link to='/homebanner'><li>Banner List</li></Link>
                    <Link to='/homebanner/bannerupload'><li>Add Banner</li></Link>
                </ul>
            </div>
        </li>
        {/* <Link to='/'><li><Button className={`w-100 ${activetab===2 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(2)}><span className='icon'><FaCartShopping /></span>Orders<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===3 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(3)}><span className='icon'><MdMessage /></span>Messages<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===4 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(4)}><span className='icon'><FaBell /></span>Notifications<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===5 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(5)}><span className='icon'><IoMdSettings /></span>Settings<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/login'><li><Button className={`w-100 ${activetab===6 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(6)}><span className='icon'><FaUser /></span>Login</Button></li></Link>
        <Link to='/signup'><li><Button className={`w-100 ${activetab===7 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(7)}><span className='icon'><FaUser /></span>Signup</Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===8 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(8)}><span className='icon'><FaCartShopping /></span>Orders<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===9 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(9)}><span className='icon'><MdMessage /></span>Messages<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===10 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(10)}><span className='icon'><FaBell /></span>Notifications<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===11 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(11)}><span className='icon'><IoMdSettings /></span>Settings<span className='arrow'><FaAngleDown /></span></Button></li></Link> */}
      </ul>

        <div className='logoutwrapper'>
            <div className='logoutbox'>
                <Button variant='contained' onClick={logout}><CiLogout className='mr-1' />Logout</Button>
            </div>
        </div>

    </div>
  )
}

export default Sidebar
