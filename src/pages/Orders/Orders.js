import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {Button,Pagination, Dialog} from "@mui/material";
import { IoMdClose } from 'react-icons/io';
import { editdata, fetchdatafromapi } from "../../utils/api";

const Orders = () => {
  const [orderdata, setorderdata] = useState([])
  const [productdata, setproductdata] = useState([])
  const [singleorder, setsingleorder] = useState()
  const [openOrderProductModal, setopenOrderProductModal] = useState(false)
  const [page, setpage] = useState(1)



    useEffect(()=>{
        window.scrollTo(0,0);
    
        fetchdatafromapi(`/api/orders?page=1&perpage=8`).then((res)=>{
          setorderdata(res);
        })
      },[])

      const handlechange = (event, value)=>{
              setpage(value)
              fetchdatafromapi(`/api/orders?page=${value}&perpage=8`).then((res)=>{
                setorderdata(res);
                window.scrollTo({
                  top: 200,
                  behavior: 'smooth'
                })
              })
              
            }

    const openorderproducts=(id)=>{
            fetchdatafromapi(`/api/orders/${id}`).then((res)=>{
              setproductdata(res);
              setopenOrderProductModal(true)
            })
          }


          const orderstatus=(orderstatus,id)=>{
            fetchdatafromapi(`/api/orders/${id}`).then((res)=>{
                const order={
                        name:res.name,
                        phonenumber:res.phonenumber,
                        address:res.address,
                        zipcode:res.zipcode,
                        amount:res.amount,
                        paymentid:res.paymentid,
                        email:res.email,
                        userid:res.id,
                        products:res.products,
                        status:orderstatus
                }

                editdata(`/api/orders/${id}`,order).then((res)=>{
                    fetchdatafromapi(`/api/orders?page=1&perpage=8`).then((res)=>{
                        setorderdata(res);
                        window.scrollTo({
                          top: 200,
                          behavior: 'smooth'
                        })
                      })
                })

                setsingleorder(res);

              })
          }


  return (
    <div>
      <div className="right-content w-100">
        <div className="productlistbox w-100 my-3 shadow d-flex res-col">
          <h3>Orders List</h3>

          <div className="ml-auto d-flex align-items-center">
            <div className="showpath" role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/dashboard">
                  Dashboard
                </Link>
                <Typography sx={{ color: "text.primary" }}>Orders</Typography>
              </Breadcrumbs>
            </div>
            <Link to={"/category/categoryadd"} className="mr-3">
              <Button className="btn-blue pl-4 pr-4">Add Order</Button>
            </Link>
          </div>
        </div>
        <div className="card shadow border-0 p-3 mt-4">
          <div className="table-responsive mt-3 ">
            <div className="table table-bordered">
              <table className="w-100">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Products</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>ZIP code</th>
                    <th>Total Amount</th>
                    <th>Email</th>
                    <th>User ID</th>
                    <th>Order Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                {orderdata?.orderslist?.length > 0 && orderdata?.orderslist?.map((item,index)=>{
              return(
              <tbody>
            <tr key={index}>
              <td><span className='text-blue fw-bold'>{item.paymentid}</span></td>
              <td><Button className='cursor rounded btn-blue' onClick={()=>openorderproducts(item._id)}>Click Here To View</Button></td>
              <td>{item.name}</td>
              <td>{item.phonenumber}</td>
              <td>{item.address}</td>
              <td>{item.zipcode}</td>
              <td>{item.amount}</td>
              <td>{item.email}</td>
              <td>{item.userid}</td>
              <td>{item?.status === "pending" ? <span className='badge badge-danger cursor p-2' onClick={()=>orderstatus("success",item?._id)}>{item?.status}</span> : <span className='badge badge-success cursor p-2' onClick={()=>orderstatus("pending",item?._id)}>{item?.status}</span>}</td>
              <td>{item.date}</td>
            </tr>

            </tbody>
            )
            })}
              </table>
                {orderdata?.totalpages > 1 && orderdata?.map((item,index)=>{
                          return(
                            <div className="d-flex align-items-center tablefooter" key={index}>
                                                        <Pagination
                                                          count={item?.totalpages}
                                                          color="primary"
                                                          className="pagination"
                                                          showFirstButton
                                                          showLastButton
                                                          onChange={handlechange}
                                                        />
                                                      </div>
                          )
                        })}
            </div>
          </div>
        </div>
      </div>
      {openOrderProductModal &&
    <Dialog
            className="productmodal"
            open={true}
            onClose={()=>setopenOrderProductModal(false)}
          >
            <Button className="close_" onClick={()=>setopenOrderProductModal(false)}>
              <IoMdClose />
            </Button>
            <h4 className='hd mt-3 fw-bold'>Products</h4>
            <div className='table-responsive mt-3'>
            {/* {orderdata?.orderslist?.length > 0 && orderdata?.orderslist?.map((item,index)=>{
              return( */}
            <table className='table table-striped rounded ordertable table-bordered' >
              <thead>
              <tr>
                    <th>Product ID</th>
                    <th>Product Title</th>
                    <th>Product Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Amount</th>
              </tr>


              </thead>
              <tbody>

              
              
                  {productdata?.products?.length>0 && productdata?.products?.map((product,index)=>{
                    return(
                      <tr className='order-products' key={index}>
                        <td>{product.productid}</td>
                        <td>{product.producttitle}</td>
                        <td><img className='w-100 box-shadow' src={`${process.env.REACT_APP_BASE_URL}/uploads/${product.image}`}/></td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.subtotal}</td>
                      </tr>
                    )
                   })} 

              </tbody>
            </table>
                {/* )})} */}
            </div>
    </Dialog>
    }
    </div>
  );
};

export default Orders;
