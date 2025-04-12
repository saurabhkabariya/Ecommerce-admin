import { Backdrop, Breadcrumbs, Button, CircularProgress, FormControl, MenuItem, Select, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editdata, fetchdatafromapi, postdata } from '../../utils/api';
import { Mycontext } from '../../App';
import { IoMdCloudUpload } from 'react-icons/io';

const Subcatedit = () => {

  const [isloading, setisloading] = useState(false);
  const [subcategory, setsubcategory] = useState("");

  let {id}= useParams();

  const formdata=new FormData();
  
    
    const [formfield, setformfield] = useState({
      cat:"",
      subcat:"",
    });

    const context=useContext(Mycontext);

    useEffect(() => {
          context.setProgress(20);
          fetchdatafromapi(`/api/subcat/${id}`).then((res)=>{
            setsubcategory(res);
            setformfield({
              cat:res.cat,
              subcat:res.subcat
            });
            // setpreview(res.images);
            context.setProgress(100);
          })
        }, [])


    const history = useNavigate();

    const changecatinput = (e) =>{
    setsubcategory(e.target.value);
    setformfield(() => ({
      ...formfield,
      // [e.target.name]: e.target.value,
      cat: e.target.value,
    }));
    }
    const changesubcatinput = (e) =>{
      setformfield(()=>({
        ...formfield,
        [e.target.name]:e.target.value
      }))
    }

    const editSubCategory = (e)=>{
        e.preventDefault();
        formdata.append('cat',formfield.cat);
        formdata.append('subcat',formfield.subcat);
    
        if(formfield.cat!=="" || formfield.subcat!==""){
          setisloading(true);
    
          editdata(`/api/subcat/${id}`,formfield).then((res)=>{
                  setisloading(false);
                  history("/subcategory");
          })

          context.fetchcategory();
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
  return (
    <div className="right-content w-100">
      <div className="productlistbox w-100 my-3 shadow d-flex res-col">
          <h3>Edit Sub Category</h3>
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
                Edit Sub Category
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
        <form className="form" onSubmit={editSubCategory}>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                {/* {errorupload===true && <h4 className="text-danger">Enter all the required data</h4>} */}
                <h4>Basic Information</h4>
                <div className="formgroup">

                <div className="mt-3">
                      <h6>CATEGORY</h6>
                      <FormControl className="w-100" size="big">
                        <Select
                          className="w-100"
                          value={formfield.cat}
                          onChange={changecatinput}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          name='cat'
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>

                          {context.catdata?.length !== 0 &&
                            context.catdata?.map((cat, index) => {
                          // {catdata.CategoryList?.length !== 0 &&
                          //   catdata?.CategoryList?.map((cat, index) => {
                              return (
                                <MenuItem
                                  className="text-capitalize"
                                  value={cat?.id}
                                  key={index}
                                >
                                  {cat?.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                </div>

                <div className="mt-3">
                  <h6>Sub Category</h6>
                  <input type="text" name="subcat" value={formfield.subcat} onChange={changesubcatinput} />
                </div>
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
        </form>
    </div>
  )
}

export default Subcatedit
