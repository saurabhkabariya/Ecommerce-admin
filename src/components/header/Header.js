import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Button from "@mui/material/Button";
import { MdOutlineMenu } from "react-icons/md";
import Searchbox from "../searchbox/Searchbox";
import { IoIosNotificationsOutline } from "react-icons/io";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { Divider } from "@mui/material";
import { Mycontext } from "../../App";
import Myacc from "../Myacc/Myacc";



const Header = () => {
  const context=useContext(Mycontext)

  
  const [notification, setnotification] = useState(null);


  
  const opennotification=Boolean(notification)
  
  const handleClicknotification = (event) => {
    setnotification(event.currentTarget);
  };
  
  const handleClosenotification = () => {
    setnotification(null);
  };
  return (
    <header className="d-flex align-items-center">
      <div className="container-fluid w-100">
        <div className="row d-flex align-items-center">
          <div className="col-sm-2 part1 align-items-center justify-content-center d-flex">
            <Link to="/">
              <img src={logo} className="logo" alt="logo" />
            </Link>
          </div>

          {context.windowwidth > 992 && 
            <div className="col-sm-5 d-flex align-items-center part2 pl-5 res-hide">
              <Button className="rounded-circle" onClick={()=>context.setistogglesidebar(!context.istogglesidebar)}>
                <MdOutlineMenu />
              </Button>
              
              <Searchbox />
            
            </div>
          }

          
          <div className="col-sm-5 d-flex align-items-center justify-content-end part3">
            {/* <Button className="rounded-circle right-menu">
              <FiShoppingCart />
            </Button>
            <Button className="rounded-circle right-menu">
              <MdOutlineMail />
            </Button> */}

            <div className="dropdownwrapper position-relative">
            <Button className="rounded-circle right-menu mr-3" onClick={handleClicknotification}>
              <IoIosNotificationsOutline />
            </Button>
            
            <Menu
              anchorEl={notification}
              className="notification dropdown_list"
              id="notification"
              open={opennotification}
              onClose={handleClosenotification}
              onClick={handleClosenotification}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
            <div className="scroll">
                <div className="head pl-3 pb-0">
                    <h4>Orders (12)</h4>
                </div>

                <Divider className="mb-3"/>
                
              <MenuItem onClick={handleClosenotification}>
                <div className="d-flex align-items-center mb-2">
                <span className="userimg rounded-circle">
                    <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt="user" />
                </span>
                <div className="dropdowninfo">
                    <h4><b>Mahmudul</b> 
                    added to his favorite list 
                    <b> Leather belt steve madden</b>
                    </h4>
                    <p className="text-sky mb-0">few seconds ago...</p>
                </div>
                </div>
              </MenuItem>
              <MenuItem onClick={handleClosenotification}>
                <div className="d-flex align-items-center mb-2">
                <span className="userimg rounded-circle">
                    <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt="user" />
                </span>
                <div className="dropdowninfo">
                    <h4><b>Mahmudul</b> 
                    added to his favorite list 
                    <b> Leather belt steve madden</b>
                    </h4>
                    <p className="text-sky mb-0">few seconds ago...</p>
                </div>
                </div>
              </MenuItem>
              <MenuItem onClick={handleClosenotification}>
                <div className="d-flex align-items-center mb-2">
                <span className="userimg rounded-circle">
                    <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt="user" />
                </span>
                <div className="dropdowninfo">
                    <h4><b>Mahmudul</b> 
                    added to his favorite list 
                    <b> Leather belt steve madden</b>
                    </h4>
                    <p className="text-sky mb-0">few seconds ago...</p>
                </div>
                </div>
              </MenuItem>
              <MenuItem onClick={handleClosenotification}>
                <div className="d-flex align-items-center mb-2">
                <span className="userimg rounded-circle">
                    <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt="user" />
                </span>
                <div className="dropdowninfo">
                    <h4><b>Mahmudul</b> 
                    added to his favorite list 
                    <b> Leather belt steve madden</b>
                    </h4>
                    <p className="text-sky mb-0">few seconds ago...</p>
                </div>
                </div>
              </MenuItem>
              <MenuItem onClick={handleClosenotification}>
                <div className="d-flex align-items-center mb-2">
                <span className="userimg rounded-circle">
                    <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt="user" />
                </span>
                <div className="dropdowninfo">
                    <h4><b>Mahmudul</b> 
                    added to his favorite list 
                    <b> Leather belt steve madden</b>
                    </h4>
                    <p className="text-sky mb-0">few seconds ago...</p>
                </div>
                </div>
              </MenuItem>
              <MenuItem onClick={handleClosenotification}>
                <div className="d-flex align-items-center mb-2">
                <span className="userimg rounded-circle">
                    <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt="user" />
                </span>
                <div className="dropdowninfo">
                    <h4><b>Mahmudul</b> 
                    added to his favorite list 
                    <b> Leather belt steve madden</b>
                    </h4>
                    <p className="text-sky mb-0">few seconds ago...</p>
                </div>
                </div>
              </MenuItem>
              <MenuItem onClick={handleClosenotification}>
                <div className="d-flex align-items-center mb-2">
                <span className="userimg rounded-circle">
                    <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt="user" />
                </span>
                <div className="dropdowninfo">
                    <h4><b>Mahmudul</b> 
                    added to his favorite list 
                    <b> Leather belt steve madden</b>
                    </h4>
                    <p className="text-sky mb-0">few seconds ago...</p>
                </div>
                </div>
              </MenuItem>
              <MenuItem onClick={handleClosenotification}>
                <div className="d-flex align-items-center mb-2">
                <span className="userimg rounded-circle">
                    <img src="https://mironcoder-hotash.netlify.app/images/avatar/01.webp" alt="user" />
                </span>
                <div className="dropdowninfo">
                    <h4><b>Mahmudul</b> 
                    added to his favorite list 
                    <b> Leather belt steve madden</b>
                    </h4>
                    <p className="text-sky mb-0">few seconds ago...</p>
                </div>
                </div>
              </MenuItem>
              </div>
              <Button className="notificationbtn mb-0">View All Notifications</Button>
              
              
            </Menu>
            </div>

            <Button className="rounded-circle mr-3 res-show menu-icon-res" onClick={()=>context.opennav()}>
                <MdOutlineMenu />
            </Button>

            {context.islogin !== true ? <Link to='/login'><Button className="btn-blue btn-lg btn-round">Sign In</Button></Link>  :
            
              <Myacc/>

            }
            
            
            
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
