import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'

const Home = () => {
  const { userData } = useContext(UserDataContext)
  console.log("User Data in Home:", userData)

  const handleLogout = () => {
    const logoutUrl = `${import.meta.env.VITE_HOST_URL}/api/auth/logout`;
    fetch(logoutUrl, {
      method: 'POST',
      credentials: 'include', // Include cookies
    })
    .then(response => { 
      if (response.ok) {
        window.location.reload(); 
      }
    })
    .catch(error => {
      console.error('Logout error:', error);
    });
    console.log("User logged out")
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-t from-gray-900 to-blue-900 flex items-center justify-center px-4">
      
   
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
      >
        Logout
      </button>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg w-full max-w-md p-6 flex flex-col items-center text-center text-white">

        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-4 border-4 border-white/20">
          {userData?.assistantImage ? (
            <img
              src={userData.assistantImage}
              alt="Assistant"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-700 text-lg">
              No Image
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-2">
          {userData?.assistantName
            ? `Hello, I am ${userData.assistantName}`
            : "Welcome to your AI Assistant"}
        </h1>

        <p className="text-gray-300 text-sm">
          I’m here as your personal AI assistant. How can I help you today?
        </p>
      </div>
    </div>
  )
}

export default Home
