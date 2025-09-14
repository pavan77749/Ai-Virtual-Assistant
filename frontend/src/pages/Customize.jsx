import React, { useContext, useRef } from 'react';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { RiImageAddLine } from "react-icons/ri";
import { UserDataContext } from '../context/UserContext';

import Card from '../components/Card';

const Customize = () => {
  const images = [image1, image2, image4, image5, image6, image7];
  const {
    frontendImage, setFrontendImage,
    backendImage, setBackendImage,
    selectedImage, setSelectedImage
  } = useContext(UserDataContext);

  const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
    setSelectedImage("uploaded"); // so you know uploaded img is selected
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-gray-900 to-blue-800 flex items-center justify-center flex-col'>
      <h1 className='text-white text-3xl font-bold mb-4'>Choose your Assistant</h1>

      {/* Predefined Images */}
      <div className="w-[90%] flex justify-center items-center flex-wrap gap-2">
        {images.map((img, index) => (
          <Card key={index} image={img} />
        ))}

        {/* Upload Card */}
        <div
          className={`w-58 h-70 bg-black shadow-md p-1 m-4 overflow-hidden border rounded-2xl cursor-pointer flex items-center justify-center 
          ${selectedImage === "uploaded" ? "border-white" : "border-transparent"}`}
          onClick={() => inputImage.current.click()}
        >
          {!frontendImage && (
            <RiImageAddLine className="text-white w-[50px] h-[50px]" />
          )}
          {frontendImage && (
            <img src={frontendImage} alt="Uploaded" className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      {/* Hidden Input */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputImage}
        onChange={handleImage}
      />

{
  selectedImage && (
     <button className="w-50 mb-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center">
        Next
      </button>
  )
}
    </div>
  );
};

export default Customize;
