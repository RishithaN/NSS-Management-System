import React from "react";
import Imgix from "react-imgix";

const images = [
  "forest1",
  "forest2",
  "forest3",
  "mountain1",
  "mountain2",
  "mountain3",
  "river1",
  "river2",
  "river3"
];

const buildURL = imagePath =>
  `https://assets.imgix.net/tutorials/${imagePath}.webp`;

export const Gallery = () => (
  <div className="gallery">
    <br/><br/>
    <h2>Gallery</h2>
   
    {images.map(image => (
      <div style={{padding: 5, display: 'inline-block'}}>
      <Imgix
        sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
        src={buildURL(image)}
        key={image}
        imgixParams={{
          fit: "crop",
          fm: "jpg"
        }}
        width="600"
        height="600"
        
      /></div>
    ))}
    
  </div>
);


export default Gallery