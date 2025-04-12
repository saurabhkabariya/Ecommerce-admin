import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import Dashboardbox from "../Home/components/Dashboardbox";
import { FaEye, FaShoppingBag, FaShoppingCart, FaUser } from "react-icons/fa";
import { Button, Pagination } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
// import Productcard from "./components/Productcard";
import { deletedata, fetchdatafromapi } from "../../utils/api";
import { MdDelete, MdEdit } from "react-icons/md";
import Rating from '@mui/material/Rating';
import { Mycontext } from "../../App";
import { Link } from "react-router-dom";

const Product = () => {
  const [showby, setshowby] = useState("");
  const [catby, setcatby] = useState("");
  const [productlist, setproductlist] = useState([]);
  // const [productdata, setproductdata] = useState([]);

  const context=useContext(Mycontext);

  useEffect(() => {
    window.scrollTo(0, 0);

    context.setProgress(40);

    fetchdatafromapi("/api/products").then((res)=>{
      
      setproductlist(res?.ProductList);
      context.setProgress(100);
    })
  }, [])

  useEffect(()=>{
      context.fetchprodcount();
  },[productlist])

  const handlechange = (event, value)=>{
      context.setProgress(20)
      fetchdatafromapi(`/api/products?page=${value}`).then((res)=>{
        setproductlist(res?.ProductList);
        context.setProgress(100)
      })
      
    }

  const deleteProduct = (id) => {
    context.setProgress(40);
    deletedata(`/api/products`,id).then((res)=>{
      context.setProgress(100);
      context.setalertbox({
        open:true,
        msg:"Product deleted successfully!",
        color:'success'
      })
      fetchdatafromapi("/api/products").then((res)=>{
        setproductlist(res?.ProductList);
      })
    })
    
  }

  return (
    <div>
      <div className="right-content w-100">
        <div className="productlistbox w-100 my-3 shadow d-flex res-col">
          <h3>Product List</h3>

          <div className="ml-auto d-flex align-items-center">
          <div className="showpath" role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              {/* <Link underline="hover" color="inherit" to="/dashboard">
                    Dashboard
                  </Link> */}
              <Link underline="hover" color="inherit" href="/dashboard/">
                Dashboard
              </Link>
              <Typography sx={{ color: "text.primary" }}>Products</Typography>
            </Breadcrumbs>
          </div>
          <Link to={'/products/productupload'} className="mr-3"><Button className="btn-blue pl-4 pr-4">Add Product</Button></Link>
          </div>
        </div>
        <div className="dashboardboxwrapper productuserboxwrapper d-flex">
          <Dashboardbox
            color={["rgb(29, 162, 86)", "rgb(72, 212, 131)"]}
            icon={<FaUser />}
            grow={true}
            name={"Products"}
            count={"prodcount"}
          />
          <Dashboardbox
            color={[" rgb(192, 18, 226)", "rgb(235, 100, 254)"]}
            icon={<FaShoppingCart />}
            grow={false}
            name={"Categories"}
            count={"catcount"}
          />
          <Dashboardbox
            color={[" rgb(44, 120, 229)", "rgb(96, 175, 245)"]}
            icon={<FaShoppingBag />}
            grow={true}
            name={"Sub Categories"}
            count={"subcatcount"}
          />
        </div>
        <div className="card shadow border-0 p-3 mt-4">
          <h3 className="hd">Best Selling Products</h3>

          {/* <div className="row cardfilters mt-3">
            <div className="col-md-3">
              <h4>SHOW BY</h4>
              <FormControl className="w-100" size="small">
                <Select
                  className="w-100"
                  value={showby}
                  onChange={(e) => setshowby(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>CATEGORY BY</h4>
              <FormControl className="w-100" size="small">
                <Select
                  className="w-100"
                  value={catby}
                  onChange={(e) => setcatby(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="demo-select-small-label"
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
          </div> */}

          <div className="table-responsive mt-3 ">
            <div className="table table-bordered">
              <table className="w-100">
                <thead>
                  <tr>
                    {/* <th>UID</th> */}
                    <th>PRODUCT</th>
                    <th>CATEGORY</th>
                    <th>SUB CATEGORY</th>
                    <th>BRAND</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>RATING</th>
                    <th>DISCOUNT</th>
                    <th>PRODUCT RAMS</th>
                    <th>PRODUCT SIZE</th>
                    <th>PRODUCT WEIGHT</th>
                    <th>LOCATION</th>
                    {/* <th>ORDER</th>
                    <th>SALES</th> */}
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {productlist?.length !== 0 && productlist?.map((item,index)=>{
                  // {productlist.ProductList?.length !== 0 && productlist.ProductList?.map((item,index)=>{
                    return (
                      <tr className="productcard" key={index}>
                        {/* <td>#1</td> */}
                        <td>
                          <div className="d-flex productbox align-items-center">
                            <div className="imgwrapper">
                              <div className="img">
                                <img
                                  // src={item.images[0]}
                                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${item?.images[0]}`}
                                  className="shadow box rounded"
                                  width={60}
                                  height={60}
                                />
                              </div>
                            </div>
                            <div className="info">
                              <h6>{item?.name}</h6>
                              <p>{item?.description}</p>
                            </div>
                          </div>
                        </td>
                        <td>{item?.category?.name}</td>
                        <td>
                          {item?.subcatname}</td>
                        <td>{item?.brand}</td>
                        <td>
                          <span className="old">Rs. {item?.oldprice}</span>
                          <span className="new">Rs. {item?.price}</span>
                        </td>
                        <td>{item?.countInStock}</td>
                        <td><Rating name="read-only" default value={item?.rating} size="small" readOnly/></td>
                        {/* <td>380</td>
                        <td>$38k</td> */}
                        <td>{item?.discount}</td>
                        <td>{item?.productrams.length===0 ? <span className="d-flex justify-content-center w-100">-</span> : item.productrams?.map((ram)=>{return(<span className="mr-2">{ram}</span>)})}</td>
                        <td>{item?.productsize.length===0 ? <span className="d-flex justify-content-center w-100">-</span> : item.productsize?.map((size)=>{return(<span className="mr-2">{size}</span>)})}</td>
                        <td>{item?.productweight.length===0 ? <span className="d-flex justify-content-center w-100">-</span> : item.productweight?.map((weight)=>{return(<span className="mr-2">{weight}</span>)})}</td>
                        <td>{item?.location}</td>
                        <td>
                          <div className="actions d-flex align-items-center">
                            <Link to={`/products/productdetails/${item?.id}`}>
                              <Button className="secondary" color="secondary">
                                <FaEye />
                              </Button>
                            </Link>
                            <Link to={`/products/edit/${item?.id}`}>
                              <Button className="success" color="success">
                                <MdEdit />
                              </Button>
                            </Link>
                            <Button className="error" color="error" onClick={()=>deleteProduct(item?.id)}>
                              <MdDelete />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                  {/* <Productcard /> */}
                </tbody>
              </table>

                <div className="d-flex align-items-center tablefooter">
                                <Pagination
                                  count={productlist?.totalpages}
                                  color="primary"
                                  className="pagination"
                                  showFirstButton
                                  showLastButton
                                  onChange={handlechange}
                                />
                              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
