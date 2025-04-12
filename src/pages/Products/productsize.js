import { Backdrop, Breadcrumbs, Button, CircularProgress, FormControl, MenuItem, Select, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { deletedata, editdata, fetchdatafromapi, postdata } from '../../utils/api';
import { Mycontext } from '../../App';
import { IoMdCloudUpload } from 'react-icons/io';
import { MdDelete, MdEdit } from 'react-icons/md';

const Productsize = () => {

  const [isloading, setisloading] = useState(false);
  const [isedit, setisedit] = useState(false);
  const [editid, seteditid] = useState("");
  const [productsizedata, setproductsizedata] = useState([]);

  const formdata=new FormData();

  useEffect(() => {
    fetchdatafromapi("/api/productsize").then(res=>{
      setproductsizedata(res);
  })
  }, []);
  
  
    
    const [formfield, setformfield] = useState({
      productsize:"",
    });

    const context=useContext(Mycontext);

    const changeproductsize = (e) =>{
      setformfield(()=>({
        ...formfield,
        [e.target.name]:e.target.value
      }))
    }

    const addproductsize = (e,id)=>{
        e.preventDefault();
        formdata.append('productsize',formfield.productsize);
    
        if(formfield.productsize!==""){
          setisloading(true);
    
          if(isedit===false){
            postdata("/api/productsize/create",formfield).then((res)=>{
              setisloading(false);
              setformfield({
                productsize:"",
              })
              context.setalertbox({
                open:true,
                color:"success",
                msg:"RAM Added Successfully"
              });
              fetchdatafromapi("/api/productsize").then(res=>{
                setproductsizedata(res);
            })
            })
            }

          else{
            editdata(`/api/productsize/${editid}`,formfield).then(res=>{
              setisloading(false);
              setisedit(false);
              context.setalertbox({
                open:true,
                color:"success",
                msg:"RAM Updated Successfully"
              });
              setformfield({
                productsize:"",
              })
              fetchdatafromapi("/api/productsize").then(res=>{
                setproductsizedata(res);
              })
            })
            

          }

          }
    

    
        else{
          context.setalertbox({
            open:true,
            color:"error",
            msg:"Please fill all the details"
          });
          return false;
          // seterrorupload(true);
          // context.handleClickVariant('success');
        }
        // fetchdatafromapi("/api/category").then(res=>{
        //   console.log(res);
          
        // })
        
    
      }

      const deletesize = (id) =>{
        deletedata(`/api/productsize/`,id).then(res=>{
          fetchdatafromapi("/api/productsize").then(res=>{
            setproductsizedata(res);
            context.setalertbox({
              open:true,
              color:"success",
              msg:"RAM Deleted Successfully"
            });
        })
        })
      }

      const editsize = (id) =>{

        fetchdatafromapi(`/api/productsize/${id}`).then(res=>{

          setformfield({
            productsize:res.productsize
          })
          
          seteditid(id);
          setisedit(true);
          fetchdatafromapi("/api/productsize").then(res=>{
            setproductsizedata(res);
          })
        })

        
      }


  return (
    <div className="right-content w-100">
      <div className="productlistbox w-100 my-3 shadow d-flex res-col">
          <h3>Product size</h3>
          <div className="showpath" role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              {/* <Link underline="hover" color="inherit" to="/dashboard">
                        Dashboard
                    </Link> */}
              <Link underline="hover" color="rgba(0,0,0,0.6)" to="/dashboard/">
                Dashboard
              </Link>

              <Link underline="hover" color="rgba(0,0,0,0.6)" to="/subcat/">
                Sub Category List
              </Link>
            
              <Typography sx={{ color: "text.primary" }}>
                Add Sub Category
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
        <form className="form" onSubmit={addproductsize}>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                {/* {errorupload===true && <h4 className="text-danger">Enter all the required data</h4>} */}
                <h4>Basic Information</h4>
                <div className="formgroup">

                <div className="mt-3">
                  <h6>Product Size</h6>
                  <input type="text" name="productsize" value={formfield.productsize} onChange={changeproductsize} />
                </div>
                <Button type="submit" className="btn-blue btn-lg w-100 mt-3 py-2">
                  <IoMdCloudUpload className="mr-2" />
                  PUBLISH AND VIEW
                  {isloading===true && 
                    <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={isloading}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>}
                </Button>
                </div>

              </div>
              
            </div>
          </div>
        </form>

        {productsizedata?.length>0 &&

        <div className="card shadow border-0 p-3 mt-4">
                  <div className="table-responsive mt-3 ">
                    <div className="table table-bordered">
                      <table className="w-100">
                        <thead>
                          <tr>
                            <th>UID</th>
                            <th>PRODUCT Size</th>
                            <th>ACTION</th>
                          </tr>
                        </thead>
                        <tbody>

                          {productsizedata?.length>0 && productsizedata.map((item,index)=>{
                              return(
                                <tr className="productcard" key={index}>
                                  <td className="uid-col">
                                    <input type="checkbox" className="uid-checkbox" />
                                    #{index + 1}
                                  </td>
                                  <td>
                                    {item.productsize}
                                  </td>
                                  <td>
                                    <div className="actions d-flex align-items-center">
                                      {/* <Link to={`/category/categoryedit/${item.id}`}><Button className="success" color="success" onClick={editcategory(item.id)}> */}
                                      <Button className="success" color="success" onClick={()=>{editsize(item.id)}}>
                                        <MdEdit />
                                      </Button>
                                      <Button className="error" color="error" onClick={()=>{deletesize(item.id)}}>
                                        <MdDelete />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              )  

                          })}
          

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
      }
    </div>
  )
}

export default Productsize
