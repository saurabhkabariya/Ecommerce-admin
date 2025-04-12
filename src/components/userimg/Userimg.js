import React from "react";

const Userimg = (props) => {
  return (
    <div className={`userimg rounded-circle ${props.lg===true && 'lg'}`}>
      <img src={props.img} />
    </div>
  );
};

export default Userimg;
