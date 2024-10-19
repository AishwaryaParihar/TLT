
import React, { useState } from "react";
import gallery from "../data/gallery";

const Slider = () => {
  const [file, setFile] = useState(null);
  return (
    <div className="galleryContainer">
      <div className="media-container">
        {gallery.map((file) => (
          <div className="media" key={file.id} onClick={() => setFile(file)}>
            <img
              src={file.url}
              alt={`Gallery Image ${file.id}`}
              className="media-image"
            />
          </div>
        ))}
      </div>

      <div className="popup-media" style={{display:file?"block":"none"}}>
        <span onClick={()=>setFile(null)}>&times;</span>
        {file && <img src={file.url} alt={`Gallery Image ${file.id}`} />}
      </div>
    </div>
  );
};

export default Slider;
