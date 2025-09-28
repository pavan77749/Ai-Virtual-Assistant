import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from "../context/UserContext";
import axios from 'axios';

const Customize2 = () => {
  const navigate = useNavigate();
  const { userData, backendImage, selectedImage, frontendImage, handleCurrentUser } = useContext(UserDataContext);
  const [assistantName, setAssistantName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Set initial assistant name if userData exists
  useEffect(() => {
    if (userData && userData.assistantName) {
      setAssistantName(userData.assistantName);
    }
  }, [userData]);

  // Redirect to login if not logged in
  useEffect(() => {
    if (!userData) {
      navigate('/login');
    }
  }, [userData, navigate]);

  const handleCreateAssistant = async() => {
    if (!assistantName.trim()) {
      setError("Please enter an assistant name");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      
      // Handle image selection logic
      if (selectedImage === "uploaded" && backendImage) {
        formData.append("assistantImage", backendImage);
      } else if (selectedImage !== null && frontendImage) {
        // For predefined images
        formData.append("imageUrl", frontendImage);
      }
      
      const result = await axios.post(
        `${import.meta.env.VITE_HOST_URL}/api/user/update`, 
        formData,
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      if (result.status === 200) {
        // Update user data in context
        await handleCurrentUser();
        // Navigate to home or dashboard
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to create assistant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-gray-900 to-blue-800 flex items-center justify-center flex-col'>
      <h1 className='text-white text-3xl font-bold mb-4'>Enter your Assistant Name</h1>
      
      <input 
        type="text" 
        placeholder='Assistant Name' 
        className='p-2 rounded-lg mb-4 bg-amber-50 w-[300px] outline-none' 
        value={assistantName} 
        onChange={(e) => setAssistantName(e.target.value)} 
      />
      
      {error && <p className="text-red-400 mb-4">{error}</p>}
      
      <button 
        className={`w-[300px] px-4 mb-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center ${!assistantName.trim() ? 'opacity-50 cursor-not-allowed' : ''}`} 
        onClick={handleCreateAssistant}
        disabled={!assistantName.trim() || loading}
      >
        {loading ? "Creating..." : "Create Assistant"}
      </button>





    </div>  );
}

export default Customize2;
