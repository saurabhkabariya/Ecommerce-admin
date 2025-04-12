import React, { useContext, useEffect, useState } from "react";
import Dashboardbox from "./components/Dashboardbox";
import { FaEye, FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosTimer } from "react-icons/io";
import { Button, Rating } from "@mui/material";
import { Chart } from "react-google-charts";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Pagination from "@mui/material/Pagination";
import { Mycontext } from "../../App";
import { deletedata, fetchdatafromapi } from "../../utils/api";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
// import Productcard from "../Products/components/Productcard";

const ITEM_HEIGHT = 48;

const Dashboard = () => {
  const context = useContext(Mycontext);
  const [productlist, setproductlist] = useState([]);

  useEffect(() => {
    context.setishidesidebarandheader(false);
    window.scrollTo(0, 0);
    context.setProgress(40);
    
        fetchdatafromapi("/api/products").then((res)=>{
          setproductlist(res.ProductList);
          context.setProgress(100);
        })
  }, []);

    const handlechange = (event, value)=>{
        context.setProgress(20)
        fetchdatafromapi(`/api/products?page=${value}`).then((res)=>{
          setproductlist(res.ProductList);
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
          setproductlist(res.ProductList);
        })
      })
      
    }

  const [anchorEl, setAnchorEl] = useState(null);
  const [showby, setshowby] = useState("");
  const [catby, setcatby] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];

  const options = {
    backgroundColor: "transparent",
    chartArea: { width: "100%", height: "1000%" },
  };

  return (
    <div className="right-content">
      <div className="row dashboardwrapper">
        <div className="col-md-8">
          <div className="dashboardboxwrapper d-flex">
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
            <Dashboardbox
              color={["rgb(225, 149, 14)", "rgb(243, 205, 41)"]}
              icon={<BsStars />}
              grow={false}
              name={"Users"}
              count={"subcatcount"}
            />
          </div>
        </div>
        <div className="col-md-4 toppart2">
          <div className="box graphbox">
            <div className="d-flex align-items-center mt-0">
              <h6 className="my-0 text-white">Total Sales</h6>
              <div className="ml-auto">
                <Button
                  className="dots text-white ml-auto"
                  onClick={handleClick}
                >
                  <HiDotsVertical />
                </Button>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    paper: {
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <div className="d-flex align-items-center">
                      <span className="mr-2 my-auto timeicon">
                        <IoIosTimer />
                      </span>
                      Last Day
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <div className="d-flex align-items-center">
                      <span className="mr-2 my-auto timeicon">
                        <IoIosTimer />
                      </span>
                      Last Week
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <div className="d-flex align-items-center">
                      <span className="mr-2 my-auto timeicon">
                        <IoIosTimer />
                      </span>
                      Last Month
                    </div>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <div className="d-flex align-items-center">
                      <span className="mr-2 my-auto timeicon">
                        <IoIosTimer />
                      </span>
                      Last Year
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <h3 className="text-white font-weight-bold">$3,787,681.00</h3>
            <p>$3,578.90 in last month</p>
            <Chart
              chartType="PieChart"
              width="100%"
              height="170px"
              data={data}
              options={options}
            />
          </div>
        </div>
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

          {/* <div className="table-responsive mt-3 ">
            <div className="table table-bordered">
              <table className="w-100">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>CATEGORY</th>
                    <th>SUB CATEGORY</th>
                    <th>BRAND</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>RATING</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {productlist?.length !== 0 && productlist?.map((item,index)=>{
                    return (
                      <tr className="productcard" key={index}>
                        <td>
                          <div className="d-flex productbox align-items-center">
                            <div className="imgwrapper">
                              <div className="img">
                                <img
                                  // src={item.images[0]}
                                  src={`${process.env.REACT_APP_BASE_URL}/uploads/${item.images[0]}`}
                                  className="shadow box rounded"
                                  width={60}
                                  height={60}
                                />
                              </div>
                            </div>
                            <div className="info">
                              <h6>{item.name}</h6>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        </td>
                        <td>{item.category?.name}</td>
                        <td>
                          {item.subcat?.subcat}</td>
                        <td>{item.brand}</td>
                        <td>
                          <span className="old">Rs. {item.oldprice}</span>
                          <span className="new">Rs. {item.price}</span>
                        </td>
                        <td>{item.countInStock}</td>
                        <td><Rating name="read-only" default value={item.rating} size="small" readOnly/></td>
                        <td>
                          <div className="actions d-flex align-items-center">
                            <Link to={`/products/productdetails/${item.id}`}>
                              <Button className="secondary" color="secondary">
                                <FaEye />
                              </Button>
                            </Link>
                            <Link to={`/products/edit/${item.id}`}>
                              <Button className="success" color="success">
                                <MdEdit />
                              </Button>
                            </Link>
                            <Button className="error" color="error" onClick={()=>deleteProduct(item.id)}>
                              <MdDelete />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
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
          
                          {/* <div className="d-flex align-items-center tablefooter">
                                          <Pagination
                                            count={productlist?.totalpages}
                                            color="primary"
                                            className="pagination"
                                            showFirstButton
                                            showLastButton
                                            onChange={handlechange}
                                          />
                                        </div> */}
                      </div>
                    </div>
      </div>
    </div>
  );
};

export default Dashboard;
