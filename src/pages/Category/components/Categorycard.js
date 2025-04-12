import { Button } from "@mui/material";
import React from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const Categorycard = () => {
  return (
      <tr className="productcard">
        <td className="uid-col"><input type="checkbox" className="uid-checkbox"/>#1</td>
        <td>
          <div className="d-flex productbox align-items-center">
            <div className="imgwrapper">
              <div className="img">
                <img
                  src="https://mironcoder-hotash.netlify.app/images/product/01.webp"
                  className="shadow box"
                  width={60}
                  height={60}
                />
              </div>
            </div>
            <div className="info">
              <h6>Tops and skirt set for Fe...</h6>
              <p>Women's exclusive summ...</p>
            </div>
          </div>
        </td>
        <td>women</td>
        
        <td>
          <div className="actions d-flex align-items-center">
            <Link to="/products/productdetails">
              <Button className="secondary" color="secondary">
                <FaEye />
              </Button>
            </Link>
            <Button className="success" color="success">
              <MdEdit />
            </Button>
            <Button className="error" color="error">
              <MdDelete />
            </Button>
          </div>
        </td>
      </tr>
  );
};

export default Categorycard;
