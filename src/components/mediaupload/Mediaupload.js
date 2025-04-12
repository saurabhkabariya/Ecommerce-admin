// import React from "react";
// // import "bootstrap/dist/css/bootstrap.min.css";
// import { XCircle, Image as ImageIcon } from "lucide-react";

// const MediaUpload = () => {
//   return (
//     <div className="container mt-4 p-3 bg-light rounded border">
//       <h3 className="mb-4">Media And Published</h3>
//       <div className="d-flex gap-3">
//         {/* Uploaded Image Box */}
//         <div className="position-relative border rounded p-1" style={{ width: '150px', height: '150px' }}>
//           <img
//             src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
//             alt="Uploaded"
//             className="img-fluid h-100 w-100 rounded"
//             style={{ objectFit: 'cover' }}
//           />
//           {/* Remove Button */}
//           <button className="btn btn-light position-absolute p-0 border-0" style={{ top: '0px', right: '10px' }}>
//             <XCircle color="red" size={20} />
//           </button>
//         </div>

//         {/* Upload Box */}
//         <label
//           className="border border-secondary rounded d-flex flex-column align-items-center justify-content-center text-secondary"
//           style={{ width: '150px', height: '150px', borderStyle: 'dashed', cursor: 'pointer', marginLeft: '15px' }}
//         >
//           <ImageIcon size={40} className="mb-2" />
//           <span>image upload</span>
//           <input type="file" className="d-none" />
//         </label>
//       </div>
//     </div>
//   );
// };

// export default MediaUpload;

import React, { useState } from "react";
import { XCircle, Image as ImageIcon } from "lucide-react";

const MediaUpload = () => {
  const [images, setImages] = useState([]);

  // Handle file upload
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length) {
      const newImages = [...images];
      for (let file of files) {
        const imageUrl = URL.createObjectURL(file); // Create a preview URL
        newImages.push(imageUrl);
      }
      setImages(newImages);
    }
  };

  // Remove image from state
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4 p-3 bg-light rounded border">
      {/* <h3 className="mb-4">Media And Published</h3> */}
      <div className="d-flex gap-3 flex-wrap">
        {/* Display uploaded images */}
        {images.map((imgSrc, index) => (
          <div key={index} className="position-relative border rounded p-1" style={{ width: "150px", height: "150px" }}>
            <img
              src={imgSrc}
              alt="Uploaded"
              className="img-fluid h-100 w-100 rounded"
              style={{ objectFit: "cover" }}
            />
            {/* Remove Button */}
            <button
              className="btn btn-light position-absolute p-0 border-0"
              style={{ top: "0px", right: "10px" }}
              onClick={() => removeImage(index)}
            >
              <XCircle color="red" size={20} />
            </button>
          </div>
        ))}

        {/* Upload Box */}
        <label
          className="border border-secondary rounded d-flex flex-column align-items-center justify-content-center text-secondary"
          style={{ width: "150px", height: "150px", borderStyle: "dashed", cursor: "pointer", marginLeft: "15px" }}
        >
          <ImageIcon size={40} className="mb-2" />
          <span>image upload</span>
          <input type="file" className="d-none" onChange={handleFileChange} multiple />
        </label>
      </div>
    </div>
  );
};

export default MediaUpload;
