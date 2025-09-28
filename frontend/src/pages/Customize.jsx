import React, { useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { RiImageAddLine } from "react-icons/ri";
import { UserDataContext } from '../context/UserContext';

const Card = ({ image, index, selectedImage, setSelectedImage, setFrontendImage, setBackendImage }) => {
  return (
    <div
      className={`w-58 h-70 bg-black shadow-md p-1 m-4 overflow-hidden border rounded-2xl cursor-pointer 
      ${selectedImage === index ? "border-white" : "border-transparent"}`}
      onClick={() => {
        setSelectedImage(index);
        setFrontendImage(image);
        setBackendImage(null); // Clear any uploaded image
      }}
    >
      <img src={image} alt={`AI Assistant ${index + 1}`} className="w-full h-full object-cover" />
    </div>
  );
};

const Customize = () => {
  const navigate = useNavigate();
  const images = [image1, image2, image4, image5, image6, image7];
  const {
    frontendImage, setFrontendImage,
    backendImage, setBackendImage,
    selectedImage, setSelectedImage,
    userData
  } = useContext(UserDataContext);

  const inputImage = useRef();

  // Check if user is logged in
  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

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

      <div className="w-[90%] flex justify-center items-center flex-wrap gap-2">
        {images.map((img, index) => (
          <Card 
            key={index} 
            image={img} 
            index={index}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setFrontendImage={setFrontendImage}
            setBackendImage={setBackendImage}
          />
        ))}

        <div
          className={`w-58 h-70 bg-black shadow-md p-1 m-4 overflow-hidden border rounded-2xl cursor-pointer flex items-center justify-center 
          ${selectedImage === "uploaded" ? "border-white" : "border-transparent"}`}
          onClick={() => {
            inputImage.current.click();
          }}
        >
          {!frontendImage || selectedImage !== "uploaded" ? (
            <RiImageAddLine className="text-white w-[50px] h-[50px]" />
          ) : (
            <img src={frontendImage} alt="Uploaded" className="w-full h-full object-cover" />
          )}
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputImage}
        onChange={handleImage}
      />

      {selectedImage !== null && (
        <button 
          className="w-50 mb-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 mt-5 rounded-lg transition-all duration-300 flex items-center justify-center" 
          onClick={() => navigate('/customize2')}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;
