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


const Category = () => {

  const context = useContext(Mycontext);

  const [catdata, setcatdata] = useState([]);
  // const [editfields, seteditfields] = useState([]);
  const [editid, seteditid] = useState(null);
  // const [isloading, setisloading] = useState(false);
  const [categorylist, setcategorylist] = useState([]);
  const [formfield, setformfield] = useState({
      name:"",
      subcat:"",
      images:[]
    })
  

  

  useEffect(() => {
    window.scrollTo(0, 0);

    context.setProgress(context.progress + 20)

    fetchdatafromapi("/api/category").then((res) => {
      // console.log(res);
      
      setcatdata(res);
      setcategorylist(res.categorylist);
    });
    context.setProgress(100)
  }, []);

  const deletecategory = (id) => {
      context.setProgress(40);
      deletedata(`/api/category`,id).then((res)=>{
        context.setProgress(100);
        context.setalertbox({
          open:true,
          msg:"Product deleted successfully!",
          color:'success'
        })
        fetchdatafromapi("/api/category").then((res)=>{
          setcategorylist(res.categorylist);
          setcatdata(res);
        })
      })
      
    }

  const [open, setOpen] = React.useState(false);

  

  // const handleClose = () => {
  //   setOpen(false);
  // };

  

  // const changeinput = (e) =>{
  //   setformfield(()=>({
  //     ...formfield,
  //     [e.target.name]:e.target.value
  //   }))
  // }

  // const addImgURL = (e)=>{
  //   const arr=[];
  //   arr.push(e.target.value);
  //   setformfield(()=>({
  //     ...formfield,
  //     [e.target.name]:arr
  //   }))
  // }

  // const editcategory = (id) => {
  //     // setOpen(true);
  //     seteditid(id);

  //     fetchdatafromapi(`/api/category/${id}`).then((res) => {
  //       setformfield({
  //         name: res.name,
  //         images: res.images
  //       });
  //     });
  // }

  // const deletecategory = (id) => {
  //   deletedata(`/api/category/`,id).then((res)=>{
  //     fetchdatafromapi("/api/category").then((res) => {
  //       setcatdata(res);
  //     });
  //   })
  // }

  // const categoryeditsubmit= (e)=>{
  //   e.preventDefault();
  //   setisloading(true);

  //   context.setProgress(20);

  //   editdata(`/api/category/${editid}`,formfield).then((res) => {
  //     fetchdatafromapi("/api/category").then((res) => {
  //       setcatdata(res);
  //       setOpen(false);
  //       setisloading(false);
  //     });
  //     context.setalertbox({
  //       open:true,
  //       color:"success",
  //       msg:"Category Updated Successfully"
  //     });
  //     context.setProgress(100);
  //   });
  // }


  const handlechange = (event, value)=>{
    context.setProgress(20)
    fetchdatafromapi(`/api/category`).then((res)=>{
      setcatdata(res);
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
              <Typography sx={{ color: "text.primary" }}>Categories</Typography>
            </Breadcrumbs>
          </div>
          <Link to={'/category/categoryadd'} className="mr-3"><Button className="btn-blue pl-4 pr-4">Add Category</Button></Link>

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
                    <th>CATEGORY</th>
                    {/* <th>SUB CATEGORY</th> */}
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {categorylist?.length > 0 && categorylist?.map((item,index) => {
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
                                    src={`${process.env.REACT_APP_BASE_URL}/uploads/${item?.images[0]}`}
                                    className="shadow box"
                                    width={60}
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
                          <td>{item?.name}</td>
                          {/* <td>{item.subcat}</td> */}

                          <td>
                            <div className="actions d-flex align-items-center">
                              {/* <Link to={`/category/categoryedit/${item.id}`}><Button className="success" color="success" onClick={editcategory(item.id)}> */}
                              <Link to={`/category/categoryedit/${item?.id}`}><Button className="success" color="success">
                                <MdEdit />
                              </Button>
                              </Link>
                              <Button className="error" color="error" onClick={()=>{deletecategory(item?._id)}}>
                                <MdDelete />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                  {/* <Categorycard/>
                  <Categorycard/>
                  <Categorycard/>
                  <Categorycard/>
                  <Categorycard/>
                  <Categorycard/>
                  <Categorycard/>
                  <Categorycard/>
                  <Categorycard/>
                  <Categorycard/> */}
                </tbody>
              </table>
              {/* <div className="d-flex align-items-center tablefooter">
                <p>
                  showing <b>{pageno}</b> of <b>{catdata?.length}</b> results
                </p>
                {catdata?.totalpages > 1 && 
                <Pagination
                  count={catdata?.totalpages}
                  color="primary"
                  className="pagination"
                  showFirstButton
                  showLastButton
                  onChange={handlechange}
                />
                }
              </div> */}
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

export default Category;
