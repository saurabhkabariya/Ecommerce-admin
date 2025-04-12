import {
  Breadcrumbs,
  Button,
  FormControl,
  MenuItem,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
// import MediaUpload from "../../components/mediaupload/Mediaupload";
import { editdata, fetchdatafromapi, postdata } from "../../utils/api";
import { Mycontext } from "../../App";
import { XCircle, Image as ImageIcon } from "lucide-react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import Down from "../../components/countrydrop/Down";

const Productedit = () => {
  const [category, setcategory] = useState("");
  const [subcat, setsubcat] = useState("");
  const [product, setproduct] = useState([]);
  const [subcatdata, setsubcatdata] = useState([]);
  const [subcatname, setsubcatname] = useState([]);

  const [productram, setproductram] = useState([]);
  const [productweight, setproductweight] = useState([]);
  const [productsize, setproductsize] = useState([]);

  const [location, setlocation] = useState([]);

  const [productramdata, setproductramdata] = useState([]);
    const [productweightdata, setproductweightdata] = useState([]);
    const [productsizedata, setproductsizedata] = useState([]);
  // const [subcategory, setsubcategory] = useState("");
  const [isfeatured, setisfeatured] = useState(null);
  const [ratingval, setratingval] = useState(null);
  const [catdata, setcatdata] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [files, setfiles] = useState([]);
  const [imgfiles, setimgfiles] = useState([]);
  const [preview, setpreview] = useState([]);
  const [isselectedfile, setisselectedfile] = useState(false);
  const [isselectedimage, setisselectedimage] = useState(false);

  const history = useNavigate();
  const context = useContext(Mycontext);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  let { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [formfield, setformfield] = useState({
    name: "",
    subcat: "",
    description: "",
    // images: [],
    brand: "",
    price: 0,
    oldprice: 0,
    category: "",
    catname:"",
    subcatname:"",
    subcatid:"",
    countInStock: 0,
    rating: 0,
    isFeatured: false,
    discount: 0,
    productrams: [],
    productsize: [],
    productweight: [],
    location:""
  });

  const formdata = new FormData();

  // const productImages = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);

    context.setProgress(context.progress + 20);

    fetchdatafromapi("/api/category").then((res) => {
      setcatdata(res);
    });
    context.setProgress(100);
  }, []);

  useEffect(() => {
    if (!imgfiles) return;
    let tmp = [];
    for (let i = 0; i < imgfiles.length; i++) {
      tmp.push(URL.createObjectURL(imgfiles[i]));
    }

    const objurl = tmp;
    setpreview(objurl);

    for (let i = 0; i < objurl.length; i++) {
      return () => {
        URL.revokeObjectURL(objurl[i]);
      };
    }
  }, [imgfiles]);

  useEffect(() => {
    context.setProgress(20);
    fetchdatafromapi(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${context?.token}` }
      }).then((res) => {
      setproduct(res);
      setformfield({
        name: res.name,
        subcat: res.category,
        description: res.description,
        // images: [],
        brand: res.brand,
        price: res.price,
        oldprice: res.oldprice,
        category: res.category,
        catname:res.catname,
        subcatname:res.subcatname,
        subcatid:res.subcatid,
        countInStock: res.countInStock,
        rating: res.rating,
        isFeatured: res.isFeatured,
        discount: res.discount,
        productrams: res.productrams,
        productsize: res.productsize,
        productweight: res.productweight,
        location:res.location
      });
      setratingval(res.rating);
      setpreview(res.images);
      setisfeatured(res.isFeatured);
      setcategory(res.catname);
      setsubcat(res.subcat);
      setproductram(res.productrams);
      setproductsize(res.productsize);
      setproductweight(res.productweight);
      setlocation(res.location);
      setsubcatname(res.subcatname);
      context.setselectedCountry(location);
      context.setProgress(100);
    });

    fetchdatafromapi("/api/productrams").then((res) => {
          setproductramdata(res);
        })
        fetchdatafromapi("/api/productsize").then((res) => {
          setproductsizedata(res);
        })
        fetchdatafromapi("/api/productweight").then((res) => {
          setproductweightdata(res);
        })
  }, []);

  useEffect(()=>{
    setlocation(context.selectedCountry);
    setformfield(() => ({
      ...formfield,
      // [e.target.name]: e.target.value,
      location: context.selectedCountry,
    }));
  },[context.selectedCountry])

   useEffect(()=>{
      const subcatarr=[];
  
      context.catdata?.length > 0 && context.catdata?.map((cat,index)=>{
        if(cat?.children?.length > 0){
          cat?.children?.map((child)=>{
            subcatarr.push(child);
          })
        }
      })
      setsubcatdata(subcatarr);
      
    },[context.catdata])

  const inputChange = (e) => {
    setformfield(() => ({
      ...formfield,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFile = async (e, apiendpoint) => {
    try {
      const imgarr = [];
      const files = e.target.files;

      for (var i = 0; i < files.length; i++) {
        if (
          files[i] &&
          (files[i].type === "image/jpeg" ||
            files[i].type === "image/png" ||
            files[i].type === "image/jpg" ||
            files[i].type === "image/webp")
        ) {
          setimgfiles(e.target.files);
          const file = files[i];
          imgarr.push(file);
          formdata.append("images", file);
          setfiles(imgarr);
          context.setalertbox({
            open: true,
            msg: "Image uploaded successfully!",
            color: "success",
          });
          setisselectedfile(true);
          setisselectedimage(true);
        } else {
          context.setalertbox({
            open: true,
            msg: "Please enter image in JPEG,JPG or PNG format!",
            color: "error",
          });
        }
      }

      // setimgfiles(e.target.files);

      // for (var i = 0; i < files.length; i++) {
      //   const file = files[i];
      //   imgarr.push(file);
      //   formdata.append("images", file);
      // }

      // setfiles(imgarr);

      postdata(apiendpoint, formdata).then((res) => {
        // console.log(res);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCatChange = (e) => {
    
    // setformfield(() => ({
    //   ...formfield,
    //   category: e.target.value,
    // }));
  };

  const handlesubcatchange = (e) => {
    setsubcat(e.target.value);
    setformfield(() => ({
      ...formfield,
      subcat: e.target.value,
    }));

    // formfield.subcatid=e.target.value;
  };

  const isfeaturedchange = (e) => {
    setisfeatured(e.target.value);
    setformfield(() => ({
      ...formfield,
      // [e.target.name]: e.target.value,
      isFeatured: e.target.value,
    }));
  };

  const productramchange = (e) => {
    setproductram(e.target.value);
    setformfield(() => ({
      ...formfield,
      // [e.target.name]: e.target.value,
      productrams: e.target.value,
    }));
    setproductram(
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
    );
  };
  const productsizechange = (e) => {
    setproductsize(e.target.value);
    setformfield(() => ({
      ...formfield,
      // [e.target.name]: e.target.value,
      productsize: e.target.value,
    }));
    setproductsize(
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
    );
  };
  const productweightchange = (e) => {
    setproductweight(e.target.value);
    setformfield(() => ({
      ...formfield,
      // [e.target.name]: e.target.value,
      productweight: e.target.value,
    }));
    setproductweight(
      typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
    );
  };

  const handleRatingChange = (e, newValue) => {
    setratingval(newValue);
    setformfield(() => ({
      ...formfield,
      // [e.target.name]: e.target.value,
      rating: newValue,
    }));
  };

  const selectcat = (cat,id)=>{
    formfield.catname=cat;
    formfield.category=id;
    setcategory(cat);
  }

  const subcatselect = (subcat,id)=>{
    formfield.subcatid=id;
    formfield.subcatname=subcat;

  }

  const [images, setImages] = useState([]);

  // const imagesarr=[];

  // const addproductimg = () =>{
  //   // imagesarr.push(productImages.current.value);
  //   // setImages(imagesarr);

  //     setImages(prevArray => [...prevArray, productImages.current.value]);
  //     productImages.current.value = "";

  // }

  // Handle file upload
  // const handleFileChange = (event) => {
  //   const files = event.target.files;
  //   if (files.length) {
  //     const newImages = [...images];
  //     for (let file of files) {
  //       const imageUrl = URL.createObjectURL(file); // Create a preview URL
  //       newImages.push(imageUrl);
  //     }
  //     setImages(newImages);
  //     setformfield(() => ({
  //       ...formfield,
  //       images: newImages,
  //     }));
  //   }
  // };

  // Remove image from state
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // const addProduct = (e) => {
  //   e.preventDefault();
  //   // console.log(formfield);
  //   // formfield.images = productImages;
  //   formfield.images = images;

  //   postdata("/api/products/create",formfield).then((res)=>{
  //     context.setAlertbox({
  //       open:true,
  //       msg:"The Product is created!",
  //       color:"success"
  //     })
  //   })

  const editProduct = async (e) => {
    e.preventDefault();
    try {
      formdata.append("name", formfield.name);
      formdata.append("subcat", formfield.subcat);
      formdata.append("description", formfield.description);
      formdata.append("brand", formfield.brand);
      formdata.append("price", formfield.price);
      formdata.append("oldprice", formfield.oldprice);
      formdata.append("category", formfield.category);
      formdata.append("catname", formfield.catname);
      formdata.append("subcatname", formfield.subcatname);
      formdata.append("subcatid", formfield.subcatid);
      formdata.append("countInStock", formfield.countInStock);
      formdata.append("rating", formfield.rating);
      formdata.append("isFeatured", formfield.isFeatured);
      formdata.append("discount", formfield.discount);
      formdata.append("productrams", formfield.productrams);
      formdata.append("productsize", formfield.productsize);
      formdata.append("productweight", formfield.productweight);
      formdata.append("location", formfield.location);

      // formfield.images = images;
      if (
        formfield.name === "" ||
        formfield.subcatname === "" ||
        formfield.description === "" ||
        formfield.brand === "" ||
        formfield.price === 0 ||
        formfield.oldprice === 0 ||
        formfield.discount === 0 ||
        formfield.location === ""
      ) {
        context.setalertbox({
          open: true,
          msg: "Please fill required details",
          color: "error",
        });
        return false;
      }

      if (isselectedimage !== true) {
        context.setalertbox({
          open: true,
          msg: "Please Edit Image!",
          color: "error",
        });
        return false;
      }

      setisloading(true);

      // formfield.images = images;
      const res = await editdata(`/api/products/${id}`, formfield).then(
        (res) => {
          context.setalertbox({
            open: true,
            msg: "The Product is created!",
            color: "success",
          });
          setformfield({
            name: "",
            subcat: "",
            description: "",
            // images: [],
            brand: "",
            price: 0,
            oldprice: 0,
            category: "",
            catname:"",
            subcatname:"",
            subcatid:"",
            countInStock: 0,
            rating: 0,
            isFeatured: false,
            images: [],
            discount: 0,
            productrams: [],
            productsize: [],
            productweight: [],
            location: ""
          });

          history("/products");

          setisloading(false);
        }
      );
    } catch (err) {
      console.error("Error creating product:", err);
      context.setalertbox({
        open: true,
        msg: "Failed to create product!",
        color: "error",
      });
    }
  };

  // if(formfield.name!=="" && formfield.images.length>0){
  //   setisloading(true);

  //   postdata("/api/category/create",formfield).then((res)=>{
  //     setisloading(false);
  //     history("/category");
  //   })

  // }
  // };

  return (
    <div>
      <div className="right-content w-100">
        <div className="productlistbox w-100 my-3 shadow d-flex res-col">
          <h3>Product Edit</h3>
          <div className="showpath" role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              {/* <Link underline="hover" color="inherit" to="/dashboard">
                        Dashboard
                    </Link> */}
              <Link underline="hover" color="rgba(0,0,0,0.6)" to="/dashboard/">
                Dashboard
              </Link>
              <Link underline="hover" color="rgba(0,0,0,0.6)" to="/products/">
                Products List
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                Product Edit
              </Typography>
            </Breadcrumbs>
          </div>
        </div>
        <form className="form" onSubmit={editProduct}>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <h4>Basic Information</h4>
                <div className="formgroup">
                  <h6>PRODUCT NAME</h6>
                  <input
                    type="text"
                    name="name"
                    onChange={inputChange}
                    value={formfield.name}
                  />
                </div>
                <div className="formgroup">
                  <h6>DESCRIPTION</h6>
                  <textarea
                    rows={5}
                    cols={10}
                    name="description"
                    onChange={inputChange}
                    value={formfield.description}
                  />

                  <div className="row cardfilters mt-3">
                    <div className="col-md-4 mt-3">
                      <h6>CATEGORY</h6>
                      <FormControl className="w-100" size="big">
                        <Select
                          className="w-100"
                          value={category}
                          onChange={handleCatChange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>

                          {context.catdata.length !== 0 &&
                            context.catdata?.map((cat, index) => {
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
                    <div className="col-md-4 mt-3">
                      <h6>SUB CATEGORY</h6>
                      <FormControl className="w-100" size="big">
                        <Select
                          className="w-100"
                          value={subcat}
                          onChange={handlesubcatchange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>

                          {subcatdata.length !== 0 &&
                            subcatdata?.map((item, index) => {
                              // {catdata.CategoryList?.length !== 0 &&
                              //   catdata?.CategoryList?.map((cat, index) => {
                              return (
                                <MenuItem
                                  className="text-capitalize"
                                  value={item?._id}
                                  key={index}
                                  onClick={()=>{subcatselect(item?.name,item?._id)}}
                                >
                                  {item?.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-md-4 mt-3">
                      <h6>is Featured</h6>
                      <FormControl className="w-100" size="big">
                        <Select
                          className="w-100"
                          value={isfeatured}
                          onChange={isfeaturedchange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          labelId="demo-select-small-label"
                        >
                          <MenuItem value={null}>
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={true}>True</MenuItem>
                          <MenuItem value={false}>False</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    {/* <div className="col-md-4 mt-3">
                      <h6>SUB CATEGORY</h6>
                      <FormControl className="w-100" size="big">
                        <Select
                          className="w-100"
                          value={subcategory}
                          onChange={(e) => setsubcategory(e.target.value)}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          labelId="demo-select-small-label"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Jeans</MenuItem>
                          <MenuItem value={20}>Shirts</MenuItem>
                        </Select>
                      </FormControl>
                    </div> */}
                  </div>
                  <div className="row cardfilters">
                    {/* <div className="col-md-4 mt-3">
                      <h6>OLD PRICE</h6>
                      <input type="text" />
                    </div> */}

                    <div className="col-md-4 mt-3">
                      <h6>OLD PRICE</h6>
                      <input
                        type="text"
                        name="oldprice"
                        onChange={inputChange}
                        value={formfield.oldprice}
                      />
                    </div>
                    <div className="col-md-4 mt-3">
                      <h6>PRICE</h6>
                      <input
                        type="text"
                        name="price"
                        onChange={inputChange}
                        value={formfield.price}
                      />
                    </div>
                    <div className="col-md-4 mt-3">
                      <h6>PRODUCT STOCK</h6>
                      <input
                        type="text"
                        name="countInStock"
                        onChange={inputChange}
                        value={formfield.countInStock}
                      />
                    </div>
                  </div>
                  {/* <div className="row cardfilters">
                    <div className="col-md-4 mt-3">
                      <h6>BRAND</h6>
                      <input type="text" />
                    </div>
                    <div className="col-md-4 mt-3">
                      <h6>DISCOUNT</h6>
                      <input type="text" />
                    </div>
                    <div className="col-md-4 mt-3">
                      <h6>PRODUCT RAMS</h6>
                      <FormControl className="w-100" size="big">
                        <Select
                          className="w-100"
                          value={subcategory}
                          onChange={(e) => setsubcategory(e.target.value)}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          labelId="demo-select-small-label"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Jeans</MenuItem>
                          <MenuItem value={20}>Shirts</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div> */}

                  <div className="row cardfilters">
                    <div className="col-md-4 mt-3">
                      <h6>BRAND</h6>
                      <input
                        type="text"
                        name="brand"
                        onChange={inputChange}
                        value={formfield.brand}
                      />
                    </div>
                    <div className="col-md-4 mt-3">
                      <h6>Discount</h6>
                      <input
                        type="text"
                        name="discount"
                        onChange={inputChange}
                        value={formfield.discount}
                      />
                    </div>

                    <div className="col-md-4 mt-3">
                      <h6>RATINGS</h6>
                      <Rating
                        name="simple-controlled"
                        value={ratingval}
                        onChange={handleRatingChange}
                        size="large"
                        className="mt-3"
                      />
                    </div>
                  </div>
                  <div className="row cardfilters">
                    <div className="col-md-4 mt-3">
                      <h6>Product Size</h6>
                      <FormControl className="w-100" size="big">
                        <Select
                          multiple
                          className="w-100"
                          value={productsize}
                          onChange={productsizechange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          labelId="demo-select-small-label"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {productsizedata?.length > 0 && productsizedata?.map((item, index) => {
                                                      return(<MenuItem key={index} value={item.productsize}>{item.productsize}</MenuItem>)
                                                    })}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="col-md-4 mt-3">
                      <h6>Product Weight</h6>
                      <FormControl className="w-100" size="big">
                        <Select
                          multiple
                          className="w-100"
                          value={productweight}
                          onChange={productweightchange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          labelId="demo-select-small-label"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>

                          {productweightdata?.length > 0 && productweightdata?.map((item, index) => {
                                                      return(<MenuItem key={index} value={item.productweight}>{item.productweight}</MenuItem>)
                                                    })}
                        </Select>
                      </FormControl>
                    </div>

                    <div className="col-md-4 mt-3">
                      <h6>Product Rams</h6>
                      <FormControl className="w-100" size="big">
                        <Select
                          multiple
                          className="w-100"
                          value={productram}
                          onChange={productramchange}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          labelId="demo-select-small-label"
                        >
                          <MenuItem value={""}>
                            <em>None</em>
                          </MenuItem>
                          {productramdata?.length !== 0 && productramdata?.map((item, index) => {
                                                      return(<MenuItem key={index} value={item.productrams}>{item.productrams}</MenuItem>)
                                                    })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>

                  <div className="row cardfilters">
                    <div className="col-md-4 mt-3">
                        <h6>Location</h6>
                        <Down location={location}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card p-4 my-3">
                <h6 className="imagepart">Media And Published</h6>

                <div className="container mt-4 p-3 bg-light rounded border">
                  {/* <h3 className="mb-4">Media And Published</h3> */}
                  <div className="d-flex gap-3 flex-wrap formgroup ml-1 mr-1">
                    {/* Display uploaded images */}
                    {preview?.length !== 0 &&
                      preview.map((img, index) => {
                        // <div
                        //   key={index}
                        //   className="position-relative border rounded p-1"
                        //   style={{ width: "150px", height: "150px" }}
                        // >
                        //   <img
                        //     src={imgSrc}
                        //     alt="Uploaded"
                        //     className="img-fluid h-100 w-100 rounded"
                        //     style={{ objectFit: "cover" }}

                        //   />
                        //   {/* Remove Button */}
                        //   <button
                        //     className="btn btn-light position-absolute p-0 border-0 bg-none"
                        //     style={{ top: "0px", right: "10px" }}
                        //     onClick={() => removeImage(index)}
                        //   >
                        //     <XCircle color="red" size={20} />
                        //   </button>
                        // </div>
                        return (
                          <div
                            key={index}
                            className="position-relative border rounded p-1"
                            style={{ width: "150px", height: "150px" }}
                          >
                            {isselectedfile === true ? (
                              <img
                                src={`${img}`}
                                className="w-100 h-100 img-fluid"
                              />
                            ) : (
                              <img
                                src={`${context.baseURL}/uploads/${img}`}
                                className="w-100 h-100 img-fluid"
                              />
                            )}

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
                        );
                      })}

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
                        onChange={(e) =>
                          onChangeFile(e, "/api/products/uploadfiles")
                        }
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
                {/* <MediaUpload/> */}

                <Button
                  className="btn-blue btn-lg w-100 mt-3 py-2"
                  type="submit"
                >
                  <IoMdCloudUpload className="mr-2" />
                  PUBLISH AND VIEW
                </Button>
                {isloading === true && (
                  <Backdrop
                    sx={(theme) => ({
                      color: "#fff",
                      zIndex: theme.zIndex.drawer + 1,
                    })}
                    open={isloading}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Productedit;
