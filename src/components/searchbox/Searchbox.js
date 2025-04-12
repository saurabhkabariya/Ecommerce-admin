import React from "react";
import Button from '@mui/material/Button';
import { IoMdSearch } from "react-icons/io";

const Searchbox = () => {
  return (
      <div className="header-search ml-3 mr-3">
        <input type="text" placeholder="Search for products..."  />
        <Button>
          <IoMdSearch />
        </Button>
      </div>
  );
};

export default Searchbox;
