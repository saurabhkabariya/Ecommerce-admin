import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import { Button, Pagination } from "@mui/material";
// import Categorycard from "./components/Categorycard";
import { deletedata, editdata, fetchdatafromapi } from "../../utils/api";

import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';

// import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import { Mycontext } from "../../App";


const Homebanner = () => {

  const context = useContext(Mycontext);

  const [homebannerdata, sethomebannerdata] = useState([]);
  // const [editfields, seteditfields] = useState([]);
  const [editid, seteditid] = useState(null);
  // const [isloading, setisloading] = useState(false);
  const [homebannerlist, sethomebannerlist] = useState([]);
  const [formfield, setformfield] = useState({
      images:[]
    })
  

  

  useEffect(() => {
    window.scrollTo(0, 0);

    context.setProgress(context.progress + 20)

    fetchdatafromapi("/api/homebanner").then((res) => {
      // console.log(res);
      
      sethomebannerdata(res);
      sethomebannerlist(res);
    });
    context.setProgress(100)
  }, []);

  const deletecategory = (id) => {
      context.setProgress(40);
      deletedata(`/api/homebanner`,id).then((res)=>{
        context.setProgress(100);
        context.setalertbox({
          open:true,
          msg:"Product deleted successfully!",
          color:'success'
        })
        fetchdatafromapi("/api/homebanner").then((res)=>{
          sethomebannerlist(res);
          sethomebannerdata(res);
        })
      })
      
    }

  const [open, setOpen] = React.useState(false);



  const handlechange = (event, value)=>{
    context.setProgress(20)
    fetchdatafromapi(`/api/homebanner?page=${value}`).then((res)=>{
      sethomebannerdata(res);
      context.setProgress(100)
    })
    
  }


  return (
    <div>
      <div className="right-content w-100">
        <div className="productlistbox w-100 my-3 shadow d-flex res-col">
          <h3>Category List</h3>

          <div className="ml-auto d-flex align-items-center">

            

          <div className="showpath" role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              {/* <Link underline="hover" color="inherit" to="/dashboard">
                    Dashboard
                  </Link> */}
              <Link underline="hover" color="inherit" href="/dashboard/">
                Dashboard
              </Link>
              <Typography sx={{ color: "text.primary" }}>Homebanner</Typography>
            </Breadcrumbs>
          </div>
          <Link to={'/homebanner/bannerupload'} className="mr-3"><Button className="btn-blue pl-4 pr-4">Add Homebanner</Button></Link>

          </div>

        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <div className="table-responsive mt-3 ">
            <div className="table table-bordered">
              <table className="w-100">
                <thead>
                  <tr>
                    <th>UID</th>
                    <th>IMAGE</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {homebannerlist?.length > 0 && homebannerlist?.map((item,index) => {
                      return (
                        <tr className="productcard" key={index}>
                          <td className="uid-col">
                            <input type="checkbox" className="uid-checkbox" />
                            #{index + 1}
                          </td>
                          <td>
                            <div className="d-flex categorybox align-items-center">
                              <div className="imgwrapper">
                                <div className="img">
                                  <img
                                    // src={item.images[0]}
                                    src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.images[0]}`}
                                    className="shadow box"
                                    width={200}
                                    height={60}
                                  />
                                </div>
                              </div>
                              {/* <div className="info">
                                <h6>Tops and skirt set for Fe...</h6>
                                <p>Women's exclusive summ...</p>
                              </div> */}
                            </div>
                          </td>
                          {/* <td>{item.name}</td> */}
                          {/* <td>{item.subcat}</td> */}

                          <td>
                            <div className="actions d-flex align-items-center">
                              {/* <Link to={`/category/categoryedit/${item.id}`}><Button className="success" color="success" onClick={editcategory(item.id)}> */}
                              <Link to={`/homebanner/banneredit/${item.id}`}><Button className="success" color="success">
                                <MdEdit />
                              </Button>
                              </Link>
                              <Button className="error" color="error" onClick={()=>{deletecategory(item.id)}}>
                                <MdDelete />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>

      {/* <Dialog
        className="editmodel"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Edit Category</DialogTitle>

        <form>
        <DialogContent>
          
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Category Name"
            type="text"
            fullWidth
            value={formfield.name}
            onChange={changeinput}
            
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="images"
            name="images"
            label="Image URL"
            type="text"
            fullWidth
            value={formfield.images}
            onChange={addImgURL}
            
          />
        </DialogContent>
        <DialogActions className="mb-4 mr-3">
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button type="button" onClick={categoryeditsubmit} className="btn-blue" variant="contained">Submit{isloading===true && 
            <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isloading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>}</Button>
          
        </DialogActions>
        </form>
      </Dialog> */}

    </div>
  );
};

export default Homebanner;
