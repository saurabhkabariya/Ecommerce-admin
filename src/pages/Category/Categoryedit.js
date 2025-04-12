import {
  Breadcrumbs,
  Button,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { Link, useNavigate,useParams } from "react-router-dom";
import { editdata, fetchdatafromapi, postdata } from "../../utils/api";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Mycontext } from "../../App";
import { XCircle, Image as ImageIcon } from "lucide-react";






const Categoryedit = () => {

  const [isloading, setisloading] = useState(false);
  // const [errorupload, seterrorupload] = useState(false);

    const [files, setfiles] = useState([]);
    const [imgfiles, setimgfiles] = useState([]);
    const [preview, setpreview] = useState([]);
    const [images, setImages] = useState([]);
    const [category, setcategory] = useState([]);
    const [isselectedfile, setisselectedfile] = useState(false);

    let {id}= useParams();

    const formdata=new FormData();

  
  const [formfield, setformfield] = useState({
    name:"",
    images:[],
    subcat:"",
  })

  const context=useContext(Mycontext);

    useEffect(() => {
      if(!imgfiles) return;
      let tmp=[];
      for(let i=0;i<imgfiles.length;i++){
        tmp.push(URL.createObjectURL(imgfiles[i]))
      }
  
      const objurl=tmp;
      setpreview(objurl);
  
      for(let i=0;i<objurl.length;i++){
        return()=>{
          URL.revokeObjectURL(objurl[i]);
        }
      }
      
    }, [imgfiles])

    useEffect(() => {
      context.setProgress(20);
      fetchdatafromapi(`/api/category/${id}`).then((res)=>{
        setcategory(res);
        setformfield({
          name:res.name,
          subcat:res.subcat
        });
        setpreview(res.images);
        context.setProgress(100);
      })
    }, [])
    

  const history = useNavigate();

  const changeinput = (e) =>{
    setformfield(()=>({
      ...formfield,
      [e.target.name]:e.target.value,
      [e.target.subcat]:e.target.value
    }))
  }

  // const addImgURL = (e)=>{
  //   const arr=[];
  //   arr.push(e.target.value);
  //   setformfield(()=>({
  //     ...formfield,
  //     [e.target.name]:arr
  //   }))
  // }

  // const changeinput = (e) => {
  //   setformfield(prev => ({
  //     ...prev,
  //     [e.target.name]: e.target.value
  //   }));
  // };
  
  // const addImgURL = (e) => {
  //   setformfield(prev => ({
  //     ...prev,
  //     images: [...prev.images, e.target.value]  // Append new image URL to the array
  //   }));
  // };
  // const onChangeFile = async (e, apiendpoint) => {
  //     try{
  //       const imgarr=[];
  //       const files= e.target.files;
  //       setimgfiles(e.target.files);
  
  //       for (var i=0;i<files.length;i++){
  //         const file=files[i];
  //         imgarr.push(file);
  //         formdata.append('images',file);
  //       }
  
  //       setfiles(imgarr);
  
        
  
  
  //       postdata(apiendpoint,formdata).then((res)=>{
  
  //         // console.log(res);
  //       });
  
  //     }
  //     catch(error){
  //       console.log('error',error);
  //     }
  //   }
  const onChangeFile = async (e, apiendpoint) => {
        try{
          const imgarr=[];
          const files= e.target.files;
          // setimgfiles(e.target.files);
    
          for (var i=0;i<files.length;i++){
  
            if(files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/png' || files[i].type === 'image/jpg'  || files[i].type === 'image/webp' )){
              setimgfiles(e.target.files);
              const file=files[i];
              imgarr.push(file);
              formdata.append('images',file);
              
              setfiles(imgarr);
              context.setalertbox({
                open:true,
                msg:"Image uploaded successfully!",
                color:"success"
              });
              setisselectedfile(true);
            }
            else{
              context.setalertbox({
                open:true,
                msg:"Please enter image in JPEG,JPG or PNG format!",
                color:"error"
              });
            }
          }
    
    
          
    
    
          postdata(apiendpoint,formdata).then((res)=>{
    
            // console.log(res);
          });
    
        }
        catch(error){
          console.log('error',error);
        }
      }

    const removeImage = (index) => {
      setImages(images.filter((_, i) => i !== index));
    };

  const editCategory = (e)=>{
    e.preventDefault();
    formdata.append('name',formfield.name);
    formdata.append('subcat',formfield.subcat);

    if(formfield.name!=="" && formfield.subcat!=="" && isselectedfile !== false){
      setisloading(true);

      

      editdata(`/api/category/${id}`,formfield).then((res)=>{
        setisloading(false);
        history("/category");
      })

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
    <div>
      <div className="right-content w-100">
        <div className="productlistbox w-100 my-3 shadow d-flex res-col">
          <h3>Edit Category</h3>
          <div className="showpath" role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              {/* <Link underline="hover" color="inherit" to="/dashboard">
                        Dashboard
                    </Link> */}
              <Link underline="hover" color="rgba(0,0,0,0.6)" to="/dashboard/">
                Dashboard
              </Link>

              <Link underline="hover" color="rgba(0,0,0,0.6)" to="/category/">
                Category List
              </Link>
            
              <Typography sx={{ color: "text.primary" }}>
                Edit Category
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
        <form className="form" onSubmit={editCategory}>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                {/* {errorupload===true && <h4 className="text-danger">Enter all the required data</h4>} */}
                <h4>Basic Information</h4>
                <div className="formgroup">
                  <h6>Category Name</h6>
                  <input type="text" name="name" value={formfield.name} onChange={changeinput} />
                  <h6>Sub Category</h6>
                  <input type="text" name="subcat" value={formfield.subcat} onChange={changeinput} />
                </div>
                {/* <div className="formgroup">
                  <h6>Image URL</h6>
                  <input type="text" name="images" onChange={addImgURL} />
                </div> */}
                
              </div>
              <div className="card p-4 my-3">
                {/* <h6 className="imagepart">Media And Published</h6>

                <MediaUpload/> */}
                <h6 className="imagepart">Media And Published</h6>

                  <div className="container mt-4 p-3 bg-light rounded border">
                    {/* <h3 className="mb-4">Media And Published</h3> */}
                    <div className="d-flex gap-3 flex-wrap formgroup ml-1 mr-1">
                      {/* Display uploaded images */}
                      {preview?.length !== 0 && preview.map((img, index) => (
                        <div
                          key={index}
                          className="position-relative border rounded p-1"
                          style={{ width: "150px", height: "150px" }}
                        >
                          {
                            isselectedfile === true ? 
                            <img src={`${img}`} className="w-100"/>
                            : <img src={`${context.baseURL}/uploads/${img}`} className="w-100"/>
                          }
                          {/* <img
                            src={imgSrc}
                            alt="Uploaded"
                            className="img-fluid h-100 w-100 rounded"
                            style={{ objectFit: "cover" }}
                            
                          /> */}
                          {/* Remove Button */}
                          {/* <button
                            className="btn btn-light position-absolute p-0 border-0 bg-none"
                            style={{ top: "0px", right: "10px" }}
                            onClick={() => removeImage(index)}
                          >
                            <XCircle color="red" size={20} />
                          </button> */}
                        </div>
                      ))}

                      {/* Upload Box */}
                      <label
                        className="border border-secondary rounded d-flex flex-column align-items-center justify-content-center text-secondary"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderStyle: "dashed",
                          cursor: "pointer",
                          marginLeft: "15px",
                        }}
                      >
                        <ImageIcon size={40} className="mb-2" />
                        <span>image upload</span>
                        <input
                          type="file"
                          className="d-none"
                          multiple
                          onChange={(e) => onChangeFile(e,'/api/category/uploadfiles')} 
                          name="images"
                        />
                      </label>
                      
                          {/* { images?.length !== 0 && images.map((item, index) => {
                            return(
                              <div
                          className="position-relative border rounded p-1 d-flex gap-2"
                          style={{ width: "150px", height: "150px" }}
                          key={index}
                        >
                                <img
                              src={item}
                              alt="Uploaded"
                              className="img-fluid h-100 w-100 rounded"
                              style={{ objectFit: "cover" }}
                              
                            />
                            </div>
                            )
                          })}
                      
                      

                      <div className="mt-3 w-100">
                        <h6>Image URL</h6>
                        <div className="inputbtn position-relative">
                          <input type="text" className="w-100 img-input" name="brand" onChange={inputChange} ref={productImages} value={formfield.images} />
                          {errors.img && errors.img.message}
                          <Button className="btn-blue btn-lg position-absolute imgaddbtn" onClick={addproductimg}>ADD</Button>
                        </div>
                      </div> */}

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
    </div>
  );
};

export default Categoryedit;
