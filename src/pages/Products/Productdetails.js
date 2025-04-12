import { Breadcrumbs, Button, Rating, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdBrandingWatermark, MdRateReview, MdVerified } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { IoIosColorPalette, IoMdCart, IoMdSettings } from "react-icons/io";
import Userimg from '../../components/userimg/Userimg';
import { FaReply } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import { fetchdatafromapi } from '../../utils/api';
import Productzoom from '../../components/productzoom/Productzoom';


const Productdetails = () => {
  const [proddata, setproddata] = useState([]);
  const [reviewdata,setreviewdata]=useState([]);
  let [fivestar,setfivestar]=useState(0);
  let [fourstar,setfourstar]=useState(0);
  let [threestar,setthreestar]=useState(0);
  let [twostar,settwostar]=useState(0);
  let [onestar,setonestar]=useState(0);
  let [zerostar,setzerostar]=useState(0);
    
  
  const {id}=useParams();

  const productsliderbig=useRef();

  const productslidersml=useRef();

  useEffect(() => {
      window.scrollTo(0, 0);
  
      fetchdatafromapi(`/api/products/${id}`).then((res)=>{
        setproddata(res);
      })
  
      fetchdatafromapi(`/api/productreviews?productid=${id}`).then((res)=>{
        setreviewdata(res);
      })

      reviewrating();

    }, []);

    const reviewrating=()=>{
      reviewdata?.map((item,index)=>{
        if(item.customerrating === 5){
          setfivestar(++fivestar);
          
        }
        else if(item.customerrating === 4){
          setfourstar(++fourstar);
        }
        else if(item.customerrating === 3){
          setthreestar(++threestar);
        }
        else if(item.customerrating === 2){
          settwostar(++twostar);
        }
        else if(item.customerrating === 1){
          setonestar(++onestar);
        }
        else{
          setzerostar(++zerostar);
        }
      })
    }

  var productSlideroptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
    
  };
  var productSlidersmloptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    spaceBetweenSlides:10
    
  };

  const goToSlide= (index)=>{
    productsliderbig.current.slickGoTo(index);
    productslidersml.current.slickGoTo(index);
  }

  return (
    <div>
      <div className='right-content productdetails'>
          <div className="productlistbox w-100 my-3 shadow d-flex res-col">
            <h3>Product View</h3>
            <div className="showpath" role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              {/* <Link underline="hover" color="inherit" to="/dashboard">
                    Dashboard
                  </Link> */}
              <Link underline="hover" color='rgba(0,0,0,0.6)' to="/dashboard/">
                Dashboard
              </Link>
              <Link underline="hover" color='rgba(0,0,0,0.6)' to="/products/">
                Products List
              </Link>
              <Typography sx={{ color: "text.primary" }}>Products</Typography>
            </Breadcrumbs>
            </div>
          </div>

          <div className='card'>
            <div className='row'>
              <div className='col-md-5'>
                
                  <div className='sliderwrapper pt-3 pb-3 pl-4 pr-4'>
                    <h4 className='mb-4'>Product Gallery</h4>
                    {/* <Slider {...productSlideroptions} ref={productsliderbig} className='mb-1 sliderbig ml-3'>
                      {proddata?.images?.length>0 && proddata?.images?.map((item,index)=>{
                        return(
                          <div className='item' key={index}>
                            <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${item}`} className='w-100' alt='image1'/>
                          </div>
                        )
                      })}
                      
                    </Slider>
                    <Slider {...productSlidersmloptions } ref={productslidersml} className='slidersml ml-2'>
                    {proddata?.images?.length>0 && proddata?.images?.map((item,index)=>{
                        return(
                          <div className='item mx-1 ' onClick={()=>goToSlide(index)} key={index}>
                            <img src={`${process.env.REACT_APP_BASE_URL}/uploads/${item}`}  className='w-100' alt='image1'/>
                          </div>

                        )})}
                      
                    </Slider> */}
                    <Productzoom productdata={proddata}/>
                </div>
                
              </div>
              <div className='col-md-7'>
                <div className='sliderwrapper pt-3 pb-3 pl-4 pr-4'>
                  <h4 className='mb-4'>Product Details</h4>
                  <h4 className='detailinfo'>{proddata?.name}</h4>
                  
                  <div className='card productdetailssection'>
                    <div className='productinfo mt-3'>
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdBrandingWatermark /></span>
                          <span className='name'>Brand</span>
                        </div>
                        <div className='col-sm-7'>
                           <span className='namedetail ml-3'>{proddata?.brand}</span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><BiSolidCategory /></span>
                          <span className='name d-flex align-items-center'>Category</span>
                        </div>
                        <div className='col-sm-7'>
                           <span className='namedetail ml-3'>{proddata?.catname}</span>
                        </div>
                      </div>

                      {proddata.productsize?.length > 0 && 
                          <div className='row mb-0'>
                            <div className='col-sm-5 d-flex align-items-center'>
                              <span className='icon'><IoMdSettings /></span>
                              <span className='name d-flex align-items-center'>Size</span>
                            </div>
                            <div className='col-sm-7 d-flex align-items-center'>
                              <span className='namedetail ml-3'>
                                <ul className='list list-inline tags sml'>
                                {proddata.productsize.map((item,index)=>{
                          return(
                            <li className='list-inline-item' key={index}><span>{item}</span></li>
                          )})}

                              </ul>
                              </span>
                            </div>
                          </div>
                      }
                      {proddata.productrams?.length > 0 && 
                          <div className='row mb-0'>
                            <div className='col-sm-5 d-flex align-items-center'>
                              <span className='icon'><IoMdSettings /></span>
                              <span className='name d-flex align-items-center'>RAM</span>
                            </div>
                            <div className='col-sm-7 d-flex align-items-center'>
                              <span className='namedetail ml-3'>
                                <ul className='list list-inline tags sml'>
                                {proddata.productrams.map((item,index)=>{
                          return(
                            <li className='list-inline-item' key={index}><span>{item}</span></li>
                          )})}

                              </ul>
                              </span>
                            </div>
                          </div>
                      }
                      {proddata.productweight?.length > 0 && 
                          <div className='row mb-0'>
                            <div className='col-sm-5 d-flex align-items-center'>
                              <span className='icon'><IoMdSettings /></span>
                              <span className='name d-flex align-items-center'>Weight</span>
                            </div>
                            <div className='col-sm-7 d-flex align-items-center'>
                              <span className='namedetail ml-3'>
                                <ul className='list list-inline tags sml'>
                                {proddata.productweight.map((item,index)=>{
                          return(
                            <li className='list-inline-item' key={index}><span>{item}</span></li>
                          )})}

                              </ul>
                              </span>
                            </div>
                          </div>
                      }
                      
                            
                      {/* <div className='row mb-0'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><IoIosColorPalette /></span>
                          <span className='name d-flex align-items-center'>Color</span>
                        </div>
                        <div className='col-sm-7 d-flex align-items-center'>
                           <span className='namedetail ml-3 '>
                              <ul className='list list-inline tags sml '>
                                <li className='list-inline-item'><span>RED</span></li>
                                <li className='list-inline-item'><span>BLUE</span></li>
                                <li className='list-inline-item'><span>WHITE</span></li>
                              </ul>
                            </span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><IoMdCart /></span>
                          <span className='name d-flex align-items-center'>Size</span>
                        </div>
                        <div className='col-sm-7'>
                           <span className='namedetail ml-3'>(68) Piece</span>
                        </div>
                      </div> */}
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdRateReview /></span>
                          <span className='name d-flex align-items-center'>Review</span>
                        </div>
                        <div className='col-sm-7'>
                           <span className='namedetail ml-3'>({reviewdata?.length}) Reviews</span>
                        </div>
                      </div>
                      <div className='row mb-2'>
                        <div className='col-sm-5 d-flex align-items-center'>
                          <span className='icon'><MdVerified /></span>
                          <span className='name d-flex align-items-center'>Published</span>
                        </div>
                        <div className='col-sm-7'>
                           <span className='namedetail ml-3'>{proddata?.dateCreated}</span>
                        </div>
                      </div>

                    </div>

                  </div>
                  
                </div>
              </div>
            </div>
            <div className='px-4 productinforeview'>
              <h4 className='mt-2 mb-2'>Product Description</h4>
                <p className='productdesc'>{proddata?.description}</p>
                <br/>
                <h4 className='mt-2 mb-4'>Rating Analytics</h4>
                <div className='ratingsection'>
                  <div className='ratingrow d-flex align-items-center'>
                    <span className='col1'>5 Star</span>
                    <span className='col2'>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `calc ((100*${fivestar}/${proddata?.length})%)` }} role="progressbar" aria-valuenow={fivestar} aria-valuemin="0" aria-valuemax={reviewdata?.length}></div>
                    </div>


                    </span>
                    <span className='col3'>({fivestar})</span>
                  </div>
                  <div className='ratingrow d-flex align-items-center'>
                    <span className='col1'>4 Star</span>
                    <span className='col2'>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `calc ((100*${fourstar}/${proddata?.length})%)` }} role="progressbar" aria-valuenow={fourstar} aria-valuemin="0" aria-valuemax={reviewdata?.length}></div>
                    </div>


                    </span>
                    <span className='col3'>({fourstar})</span>
                  </div>
                  <div className='ratingrow d-flex align-items-center'>
                    <span className='col1'>3 Star</span>
                    <span className='col2'>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `calc ((100*${threestar}/${proddata?.length})%)` }} role="progressbar" aria-valuenow={threestar} aria-valuemin="0" aria-valuemax={reviewdata?.length}></div>
                    </div>


                    </span>
                    <span className='col3'>({threestar})</span>
                  </div>
                  <div className='ratingrow d-flex align-items-center'>
                    <span className='col1'>2 Star</span>
                    <span className='col2'>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `calc ((100*${twostar}/${proddata?.length})%)` }} role="progressbar" aria-valuenow={twostar} aria-valuemin="0" aria-valuemax={reviewdata?.length}></div>
                    </div>


                    </span>
                    <span className='col3'>({twostar})</span>
                  </div>
                  <div className='ratingrow d-flex align-items-center'>
                    <span className='col1'>1 Star</span>
                    <span className='col2'>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `calc ((100*${onestar}/${proddata?.length})%)` }} role="progressbar" aria-valuenow={onestar} aria-valuemin="0" aria-valuemax={reviewdata?.length}></div>
                    </div>


                    </span>
                    <span className='col3'>({onestar})</span>
                  </div>
                </div>
                {reviewdata?.length > 0 && 
                <>
                <h4 className='mt-4 mb-4'>Customer reviews</h4>
                <div className='reviewssection'>
                  {reviewdata?.map((item,index)=>{
                    return(
                      <div className='reviewsbox' key={index}>
                    <div className='row'>
                      <div className='col-sm-7 d-flex'>
                        <div className='w-100 d-flex align-items-center pl-2'>
                          {/* <div className='userinfo'>
                            <Userimg img={"https://mironcoder-hotash.netlify.app/images/avatar/01.webp"} lg={true}/>
                          </div> */}
                          <div className='info pl-3'>
                            <h5>{item?.customername}</h5>
                            <span>{item?.dateCreated} ago!</span>
                          </div>
                        </div>

                        
                        
                      </div>
                      {/* <div className='col-sm-5 d-flex'>
                        <Button className='btn-blue ml-auto replybtn'><FaReply className='mr-2' /> Reply</Button>
                      </div> */}
                      <p className='pt-3 pl-4'>{item?.review}</p>
                      <Rating className='pt-3 pl-4' name="read-only" precision={1} value={item?.customerrating} defaultValue={item?.customerrating} readOnly />

                    </div>
                  </div>
                    )
                  })}
                  
                  
                  {/* <div className='reviewsbox reply'>
                    <div className='row'>
                      <div className='col-sm-7 d-flex'>
                        <div className='w-100 d-flex align-items-center pl-2'>
                          <div className='userinfo'>
                            <Userimg img={"https://mironcoder-hotash.netlify.app/images/avatar/01.webp"} lg={true}/>
                          </div>
                          <div className='info pl-3'>
                            <h5>Miron Mahmud</h5>
                            <span>25 minutes ago!</span>
                          </div>
                        </div>

                        
                        
                      </div>
                      <div className='col-sm-5 d-flex'>
                        <Button className='btn-blue ml-auto replybtn'><FaReply className='mr-2' /> Reply</Button>
                      </div>
                      <Rating className='pt-3 pl-4' name="read-only" precision={0.5} value={4.5} readOnly />
                      <p className='pt-3 pl-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis quo nostrum dolore fugiat ducimus labore debitis unde autem recusandae? Eius harum tempora quis minima, adipisci natus quod magni omnis quas.</p>

                    </div>
                  </div> */}

                  {/* <h4 className='mt-4 mb-4 reviewformheading'>Review Reply Form</h4>
                  <form className='reviewform '>
                    <textarea className='mb-4' placeholder='Write here'></textarea>

                    <Button className='btn-blue btn-big btn-lg mx-auto w-100 py-2 btn-cap btn-bold'>Drop your replies</Button>
                  </form> */}

                  
                </div>
                </>
                }
            </div>

          </div>

      </div>
    </div>
  )
}

export default Productdetails
