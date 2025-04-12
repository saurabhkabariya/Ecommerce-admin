import React, { useContext, useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Button, Menu, MenuItem } from "@mui/material";
import Userimg from "../userimg/Userimg";
import { Mycontext } from "../../App";
import { useNavigate } from "react-router-dom";

const Myacc = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const context=useContext(Mycontext);
    

    const history=useNavigate();

    const openmyacc = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClosemyacc = () => {
        setAnchorEl(null);
        history("/myaccount");
      };

      const logout=()=>{
        setAnchorEl(null);
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
    <div className="myaccwrapper">
      <Button
        className="myacc d-flex align-items-center "
        onClick={handleClick}
      >
        <div className="d-flex align-items-center justify-content-center rounded-circle userlogochar">
        {context.user?.name?.charAt(0)}

        </div>
        <div className="userinfo res-hide">
          <h4>{context.user?.name}</h4>
          <p className="mb-0">{context.user?.email}</p>
        </div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openmyacc}
        onClose={handleClosemyacc}
        onClick={handleClosemyacc}
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
        <MenuItem onClick={handleClosemyacc}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          My account
        </MenuItem>
        <MenuItem onClick={handleClosemyacc}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Reset Password
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Myacc;
