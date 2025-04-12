import { Backdrop, Breadcrumbs, Button, CircularProgress, FormControl, MenuItem, Select, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { fetchdatafromapi, postdata } from '../../utils/api';
import { Mycontext } from '../../App';
import { IoMdCloudUpload } from 'react-icons/io';

const Subcatadd = () => {

  const [category, setcategory] = useState("");
  const [isloading, setisloading] = useState(false);
  const [catdata,setcatdata]=useState([]);
  const formdata=new FormData();
  
  useEffect(()=>{
    fetchdatafromapi("/api/category").then((res) => {
            setcatdata(res.categorylist);
          });
  },[])

    
    const [formfield, setformfield] = useState({
      name:"",
      slug:"",
      parentid:""
    });

    const context=useContext(Mycontext);


    const history = useNavigate();

    // const changecatinput = (e) =>{
    // setcategory(e.target.value);
    // console.log(e.target.value);
    
    // setformfield(() => ({
    //   ...formfield,
    //   [e.target.name]: e.target.value,
    //   name: e.target.value,
    // }));
    // }

    const changecatinput = (event) => {
      setcategory(event.target.value);
      // console.log(category);
      
      
      // setformfield((prevState) => ({
      //   ...prevState,
      //   parentid: e.target.value,
      // }));
    };
    
    const changesubcatinput = (e) =>{
      setformfield(()=>({
        ...formfield,
        [e.target.name]:e.target.value,
        slug:e.target.value
      }))
    }

    const selectcat=(cat,id)=>{
      console.log(id);
      
      formfield.parentid=id;
      // console.log(cat);
      
    }

    const addSubCategory = (e)=>{
        e.preventDefault();
        // formdata.append('cat',formfield.cat);
        // formdata.append('subcat',formfield.subcat);

        

        

        console.log(formfield);
        
    
        if(formfield.name!=="" || formfield.parentid!=="" || formfield.parentid!==undefined){
          setisloading(true);
    
          
    
          postdata("/api/category/create",formfield).then((res)=>{
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
          <h3>Add Sub Category</h3>
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
        <form className="form" onSubmit={addSubCategory}>
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
                          value={category}
                          onChange={changecatinput}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          name='category'
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          
                          {catdata?.length !== 0 &&
                            catdata?.map((cat, index) => {
                          // {catdata.CategoryList?.length !== 0 &&
                          //   catdata?.CategoryList?.map((cat, index) => {
                              return (
                                <MenuItem
                                  className="text-capitalize"
                                  value={cat?.name}
                                  key={index}
                                  onClick={()=>selectcat(cat?.name,cat?._id)}
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
                  <input type="text" name="name" value={formfield.name} onChange={changesubcatinput} />
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

export default Subcatadd
