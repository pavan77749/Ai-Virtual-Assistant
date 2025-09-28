import React, { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';

const Card = ({ image }) => {
  const { selectedImage, setSelectedImage, setBackendImage } = useContext(UserDataContext);

  return (
    <div
      className={`w-58 h-70 bg-black shadow-md p-1 m-4 overflow-hidden border rounded-2xl cursor-pointer 
      ${selectedImage === image ? "border-white" : "border-transparent"}`}
      onClick={() => {
        setSelectedImage(null);
        setBackendImage(null);
      }}
    >
      <img src={image} alt="assistant" className="h-full object-cover rounded-2xl" />
    </div>
  );
};

export default Card;
