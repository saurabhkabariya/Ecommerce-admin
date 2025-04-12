import { Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { HiDotsVertical } from "react-icons/hi";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoIosTimer } from "react-icons/io";
import { Mycontext } from '../../../App';

const ITEM_HEIGHT = 48;

const Dashboardbox = (props) => {
  const colors = props.color || ['#cccccc', '#ffffff']; // Default colors if no color prop is passed
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const count=props?.count;

  const context=useContext(Mycontext);

  return (
    <div
      className="dashboardbox"
      style={{
        backgroundImage: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
      }}
    >

        {props.grow === true ? 
            <span className='chart'><TrendingUpIcon/></span>
            :
            <span className='chart'><TrendingDownIcon/></span>
        }

        <div className='d-flex w-100'>
            <div className='col1'>
                <h4 className='text-white mb-0'>Total {props?.name}</h4>
                <span className='text-white'>{context[count]}</span>
            </div>
            <div className='ml-auto'>
                <span className='icon'>
                    {props.icon}
                </span>
            </div>
        </div>

        <div className='d-flex align-items-center mt-4'>
            <h6 className='my-0 text-white'>Last Month</h6> 
            <div className='ml-auto'>
                <Button className='dots text-white ml-auto' onClick={handleClick}><HiDotsVertical /></Button>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                    'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                    paper: {
                        style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                        },
                    },
                    }}
                >
                    <MenuItem onClick={handleClose}>
                    <div className='d-flex align-items-center'>
                        <span className='mr-2 my-auto timeicon'><IoIosTimer /></span>Last Day
                    </div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                    <div className='d-flex align-items-center'>
                        <span className='mr-2 my-auto timeicon'><IoIosTimer /></span>Last Week
                    </div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                    <div className='d-flex align-items-center'>
                        <span className='mr-2 my-auto timeicon'><IoIosTimer /></span>Last Month
                    </div>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                    <div className='d-flex align-items-center'>
                        <span className='mr-2 my-auto timeicon'><IoIosTimer /></span>Last Year
                    </div>
                    </MenuItem>
                    
            </Menu>
            </div>
        </div>
    </div>
  );
};

export default Dashboardbox;
