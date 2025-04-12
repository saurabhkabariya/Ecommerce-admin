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






const Banneredit = () => {

  const [isloading, setisloading] = useState(false);
  // const [errorupload, seterrorupload] = useState(false);

    const [files, setfiles] = useState([]);
    const [imgfiles, setimgfiles] = useState([]);
    const [preview, setpreview] = useState([]);
    const [images, setImages] = useState([]);
    const [homebanner, sethomebanner] = useState([]);
    const [isselectedfile, setisselectedfile] = useState(false);

    let {id}= useParams();

    const formdata=new FormData();

  
  const [formfield, setformfield] = useState({
    images:[],
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
      fetchdatafromapi(`/api/homebanner/${id}`).then((res)=>{
        sethomebanner(res);
        setpreview(res.images);
        context.setProgress(100);
      })
    }, [])
    

  const history = useNavigate();

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
    
          });
    
        }
        catch(error){
          console.log('error',error);
        }
      }

    const removeImage = (index) => {
      setImages(images.filter((_, i) => i !== index));
    };

  const edithomebanner = (e)=>{
    e.preventDefault();

    if(isselectedfile !== false){
      setisloading(true);

      

      editdata(`/api/homebanner/${id}`,formfield).then((res)=>{
        setisloading(false);
        history("/homebanner");
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
    // fetchdatafromapi("/api/homebanner").then(res=>{
    //   console.log(res);
      
    // })
    

  }

  return (
    <div>
      <div className="right-content w-100">
        <div className="productlistbox w-100 my-3 shadow d-flex res-col">
          <h3>Edit Homebanner</h3>
          <div className="showpath" role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              {/* <Link underline="hover" color="inherit" to="/dashboard">
                        Dashboard
                    </Link> */}
              <Link underline="hover" color="rgba(0,0,0,0.6)" to="/dashboard/">
                Dashboard
              </Link>

              <Link underline="hover" color="rgba(0,0,0,0.6)" to="/homebanner/">
                Homebanner List
              </Link>
            
              <Typography sx={{ color: "text.primary" }}>
                Edit Homebanner
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
        <form className="form" onSubmit={edithomebanner}>
          <div className="row">
            <div className="col-sm-12">
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
                        </div>
                      ))}
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
                          onChange={(e) => onChangeFile(e,'/api/homebanner/uploadfiles')} 
                          name="images"
                        />
                      </label>
                      
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

export default Banneredit;
