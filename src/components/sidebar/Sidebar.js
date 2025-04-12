import React, {  useState } from 'react'
import Button from "@mui/material/Button";
import { MdDashboard } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";


const Sidebar = () => {
    const [activetab, setactivetab] = useState(null)
    const [istogglesubmenu, setistogglesubmenu] = useState(false)


    const isopensubmenu=(index)=>{
        setactivetab(index)
        setistogglesubmenu(!istogglesubmenu)
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
                </ul>
            </div>
        </li>
        <Link to='/'><li><Button className={`w-100 ${activetab===2 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(2)}><span className='icon'><FaCartShopping /></span>Orders<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===3 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(3)}><span className='icon'><MdMessage /></span>Messages<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===4 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(4)}><span className='icon'><FaBell /></span>Notifications<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===5 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(5)}><span className='icon'><IoMdSettings /></span>Settings<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/login'><li><Button className={`w-100 ${activetab===6 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(6)}><span className='icon'><FaUser /></span>Login</Button></li></Link>
        <Link to='/signup'><li><Button className={`w-100 ${activetab===7 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(7)}><span className='icon'><FaUser /></span>Signup</Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===8 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(8)}><span className='icon'><FaCartShopping /></span>Orders<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===9 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(9)}><span className='icon'><MdMessage /></span>Messages<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===10 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(10)}><span className='icon'><FaBell /></span>Notifications<span className='arrow'><FaAngleDown /></span></Button></li></Link>
        <Link to='/'><li><Button className={`w-100 ${activetab===11 && istogglesubmenu===true  ?'active':''}`} onClick={()=>isopensubmenu(11)}><span className='icon'><IoMdSettings /></span>Settings<span className='arrow'><FaAngleDown /></span></Button></li></Link>
      </ul>

        <div className='logoutwrapper'>
            <div className='logoutbox'>
                <Button variant='contained'><CiLogout className='mr-1' />Logout</Button>
            </div>
        </div>

    </div>
  )
}

export default Sidebar
