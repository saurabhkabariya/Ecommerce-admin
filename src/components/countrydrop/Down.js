import { FaAngleDown } from "react-icons/fa";
import {React,useContext,useState,useEffect} from "react";
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import { IoMdSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Mycontext } from "../../App";
import { Backdrop, CircularProgress } from "@mui/material";

const Down = (props) => {
  const [isOpenModel, setIsOpenModel] = useState(false)
  const [selectedTab, setselectedTab] = useState(null)
  const [countryList, setcountryList] = useState([])
  const [isloading, setisloading] = useState(false);

  const context=useContext(Mycontext)

  useEffect(() => {
    setisloading(true);
    setcountryList(context.countryList)
    setisloading(false);
  }, [])
  

  const filterList=(e)=>{
    const keyword=e.target.value.toLowerCase()
    if(keyword!==''){
      
      const list=countryList.filter((item)=>{
        return item.country.toLowerCase().includes(keyword)
      })
      setcountryList(list)
    }
    else{
      setcountryList(context.countryList)
    }
    
  }

  const selectCountry=(index,country)=>{
    setselectedTab(index)
    setIsOpenModel(false)
    context.setselectedCountry(country)
  }

  return (
    <div>
      <Button className="countrydrop border-1 w-100" onClick={()=>{setIsOpenModel(!isOpenModel)}}>
        <div className="info d-flex flex-column">
          <span className="cname">{props.location !==''? props.location.length>15? props.location.substr(0,15)+'...':props.location : "Select a location"}</span>
          {/* <span className="cname">{context.selectedCountry !==''? context.selectedCountry.length>15? context.selectedCountry.substr(0,15)+'...':context.selectedCountry : "Select a location"}</span> */}
        </div>
        <span className="ml-auto">
          <FaAngleDown />
        </span>
      </Button>
      <Dialog open={isOpenModel} onClose={()=>{setIsOpenModel(!isOpenModel)}} className="locationmodel">
        <h4 className="mb-0">Choose your delivery location</h4>
        <p>Enter your address and we will specify the offer for your area.</p>
        <Button className="close_" onClick={()=>{setIsOpenModel(!isOpenModel)}}><IoMdClose /></Button>
        <div className="header-search w-100">
        <input type="text" placeholder="Search for products..." onChange={filterList} />
        <Button>
          <IoMdSearch />
        </Button>
      </div>
      <ul className="countrylist mt-3">
        {
          countryList?.length!==0 && countryList?.map((item,index)=>{
            return(
              <li key={index}><Button onClick={()=>{selectCountry(index, item.country)}}
              className={`${selectedTab===index ? 'active' : ''}`}>{item.country}</Button></li>
            )
          })
        }
        
      </ul>

      </Dialog>

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
  );
};

export default Down;
